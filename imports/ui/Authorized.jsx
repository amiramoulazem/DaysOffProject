import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";

import { useTracker } from "meteor/react-meteor-data";

const Authorized = ({ path, component }) => {
  const user = useTracker(() => Meteor.user());
  const authenticatedPage = ["/dashboard" ,"/admin-days-off"];
  const unAuthenticatedPage = ["/", "/register"];
  const isAuthenticatedPage = authenticatedPage.includes(path);
  const isUnauthenticatedPage = umeteornAuthenticatedPage.includes(path);
  const history = useHistory();
  useEffect(() => {
    if (user && isUnauthenticatedPage) {
      history.replace("/dashboard");
    } else if (!user && isAuthenticatedPage) {
      history.replace("/");
    }
  }, [user]);
  return <Route path={path} component={component} />;
};
export default Authorized; 

/* import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';

class Authorized extends React.Component {
  state = { authorized: false };

  componentDidMount() {
    this.checkIfAuthorized();
  }

  componentDidUpdate() {
    this.checkIfAuthorized();
  }

  checkIfAuthorized = () => {
    const { history, loading, userId, userRoles, userIsInRoles, pathAfterFailure } = this.props;

    if (!userId) history.push(pathAfterFailure || '/');

    if (!loading && userRoles.length > 0) {
      if (!userIsInRoles) {
        history.push(pathAfterFailure || '/');
      } else {
        // Check to see if authorized is still false before setting. This prevents an infinite loop
        // when this is used within componentDidUpdate.
        if (!this.state.authorized) this.setState({ authorized: true }); // eslint-disable-line
      }
    }
  };

  render() {
    const { component, path, exact, ...rest } = this.props;
    const { authorized } = this.state;

    return authorized ? (
      <Route
        path={path}
        exact={exact}
        render={(props) => React.createElement(component, { ...rest, ...props })}
      />
    ) : (
      <div />
    );
  }
}




export default withRouter(
  withTracker(({ allowedRoles, allowedGroup }) =>
    // eslint-disable-line
    Meteor.isClient
      ? {
          loading: Meteor.isClient ? !Roles.subscription.ready() : true,
          userId: Meteor.userId(),
          userRoles: Roles.getRolesForUser(Meteor.userId()),
          userIsInRoles: Roles.userIsInRole(Meteor.userId(), allowedRoles, allowedGroup),
        }
      : {},
  )(Authorized),
); */
