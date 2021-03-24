import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Authenticated from "../imports/ui/Authenticated";
import Authorized from "../imports/ui/Authorized";
import Dashboard from "../imports/ui/Dashboard";
import Login from "../imports/ui/Login";
import { Meteor } from 'meteor/meteor';
import NotFound from "../imports/ui/NotFound";
import React from 'react';
import Register from "../imports/ui/Register";
import { render } from 'react-dom';

const Routes = () => {
  return(
    <Router>
      <Switch>
        <Authorized path="/" exact component={Login} />
        <Authorized path="/register" component={Register} />
        <Authenticated path="/dashboard" component={Dashboard} />
        <Authorized path="*" component={NotFound} />
      </Switch>
    </Router>
 )
  };
Meteor.startup(() => {
  render(<Routes/>, document.getElementById('react-target'));
});