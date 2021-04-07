import { Meteor } from "meteor/meteor";
import registrationSchema from "../schema-validation/registration-schema"

/*PUBLISHING ROLES  */
Meteor.publish(null, function () {
    if (this.userId) {
      return Meteor.roleAssignment.find({ "user._id": this.userId });
    } else {
      this.ready();
    }
  });
  Meteor.methods({
  
    async addUserToDB (data){
      /* add user to role */
      let id;
      try {
        await registrationSchema.validate(data)
      }catch (e){
        throw new Meteor.Error(e.message);
      }
      id = Accounts.createUser({
        email: data.email,
        password: data.password,
        profile: { firstName: data.firstName, lastName: data.lastName },
      });
      Roles.createRole("user", { unlessExists: true });
      Roles.addUsersToRoles(id, "user");
    },
    
  });
  /* admin role */
   if(!Meteor.users.find().count()){
      admin=Accounts.createUser({username:'amira',email:'amira@gmail.com',password:'amira'});
      Roles.createRole("admin", { unlessExists: true });
      Roles.addUsersToRoles(admin,'admin')
    }
  