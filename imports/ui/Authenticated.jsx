import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";

import { useTracker } from "meteor/react-meteor-data";

const Authenticated = ({ path, component }) => {
  const user = useTracker(() => Meteor.user());
  const loading = useTracker(() => Meteor.loggingIn());
  const history = useHistory();
  const authenticatedPage = ["/dashboard","/days-off","/admin-days-off"];
  const unAuthenticatedPage = ["/","/login", "/register"];
  const isAuthenticatedPage = authenticatedPage.includes(path);
  const isUnauthenticatedPage = unAuthenticatedPage.includes(path);
  useEffect(() => {
    if (!user && isAuthenticatedPage) {
      history.replace("/");
    }
  }, [user]);
  return loading ? (
    <span>loading</span>
   
  ) : (
    <Route path={path} component={component} />
  );

};
export default Authenticated;