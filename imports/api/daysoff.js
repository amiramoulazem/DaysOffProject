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
  return Daysoff.find({ userId: this.userId }).fetch();
};
const deletePeriodRequest = function (_id) {
  Daysoff.remove({ _id, userId: this.userId });
};
const daysoffValidation = function ({id , update}){
  const days= Daysoff.findOne({_id: id, userId: this.userId });
  if (!days) {
    throw new Meteor.Error("period not found");
  }
  Daysoff.update({ _id: id }, { $set: update });
};

Meteor.methods({
  createPeriod,
  readPeriod,
  deletePeriodRequest,
  daysoffValidation
});
