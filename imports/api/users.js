import { Meteor } from "meteor/meteor";

/*PUBLISHING ROLES  */
Meteor.publish(null, function () {
    if (this.userId) {
      return Meteor.roleAssignment.find({ "user._id": this.userId });
    } else {
      this.ready();
    }
  });
  Meteor.methods({
  
    addUserToDB(user) {
      /* add user to role */
      let id;
  
      id = Accounts.createUser({
        email: user.email,
        password: user.password,
        profile: { firstName: user.firstName, lastName: user.lastName },
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
  