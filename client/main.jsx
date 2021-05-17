import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import AdminDaysOff from '../imports/ui/Daysoff/AdminDaysOff'
import Authenticated from "../imports/ui/Authenticated";
import Authorized from "../imports/ui/Authorized";
import Dashboard from "../imports/ui/Dashboard";
import Login from "../imports/ui/Login";
import { Meteor } from 'meteor/meteor';
import NotFound from "../imports/ui/NotFound";
import React from 'react';
import Register from "../imports/ui/Register";
import TaskTracker from '../imports/ui/TaskTracker/TaskTracker';
import UserDaysOff from "../imports/ui/Daysoff/UserDaysOff";
import WekanDashboard from "../imports/ui/Wekan/WekanDashboard";
import { render } from 'react-dom'

const Routes = () => {
  return(
    <Router>
      <Switch>
        <Authorized path="/" exact component={Login} />
        <Authorized path="/register" component={Register} />
        <Authenticated path="/dashboard" component={Dashboard} />
        <Authenticated path="/Wekan" component={WekanDashboard} />
        <Authenticated path="/days-off" component={UserDaysOff} />
        {/* { Roles.userIsInRole( Meteor.userId(), "admin")?} */}
        <Authenticated path="/admin-days-off" component={AdminDaysOff} /> 
        <Authenticated path="/task-tracker" component={TaskTracker} />
        <Authorized path="*" component={NotFound} />
      </Switch>
    </Router>
 )
  };
Meteor.startup(() => {
  render(<Routes/>, document.getElementById('react-target'));
});