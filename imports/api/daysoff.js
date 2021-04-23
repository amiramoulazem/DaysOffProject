import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

export default Daysoff = new Mongo.Collection("daysoff");

if (Meteor.isServer) {
  Meteor.publish("daysoff", function () {
    Daysoff.find({ userId: this.userId });
  });
}

const createPeriod = function (data) {
  if (!this.userId) {
    throw new Meteor.Error("not authorized");
  }

  Daysoff.insert({
    ...data,
    userId: this.userId,
  });
};
const readPeriod = function () {
  return Daysoff.find({ userId: this.userId, response: null }).map((e) => ({
    ...e,
    user: Meteor.users.findOne({ _id: e.userId }),
  }));
};
const deletePeriodRequest = function (_id) {
  Daysoff.remove({ _id, userId: this.userId });
};

const acceptDayOff = (_id) => {
  Daysoff.update({ _id }, { $set: { response: true } });
};

const rejectDayOff = ({ _id, message }) => {
  Daysoff.update({ _id }, { $set: { response: false, message } });
};
Meteor.methods({
  createPeriod,
  readPeriod,
  deletePeriodRequest,
  acceptDayOff,
  rejectDayOff,
});
