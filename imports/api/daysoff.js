import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

export default Daysoff = new Mongo.Collection("daysoff");

if (Meteor.isServer) {
  Meteor.publish("daysoff", function () {
   return Daysoff.find({ userId: this.userId });
  });
}
if(Meteor.isClient){
 Meteor.subscribe('daysoff')
/*handler.ready();
  Tracker.autorun(()=>{
      if (subsciption.ready()){
     data = Daysoff.find().fetch();
  }
  })
 */
 }; 
  

 
const createPeriod = function (data) {
  if (!this.userId) {
    throw new Meteor.Error("not authorized");
  }

  Daysoff.insert({
    ...data,
    userId: this.userId,
  });
};
const UserReadPeriod = function () {
  return Daysoff.find({ userId: this.userId },{sort: { _id: 1 }, limit: 3 }).map((e) => ({
    ...e,
    user: Meteor.users.findOne({ _id: e.userId }),
  }));
};
const AdminReadPeriod = function () {
  return Daysoff.find({ response: { $exists: false } }).map((e) => ({
    ...e,
    user: Meteor.users.findOne({ _id: e.userId }),
  }));
};
/* const deletePeriodRequest = function (_id) {
  Daysoff.remove({ _id, userId: this.userId });
}; */

const acceptDayOff = (_id) => {
  Daysoff.update({ _id }, { $set: { response: true } });
};

const rejectDayOff = ({ _id, message }) => {
  Daysoff.update({ _id }, { $set: { response: false, message } });
};
Meteor.methods({
  createPeriod,
  UserReadPeriod,
  /* deletePeriodRequest, */
  acceptDayOff,
  rejectDayOff,
  AdminReadPeriod,
});
