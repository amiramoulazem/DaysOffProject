import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";

import { useTracker } from "meteor/react-meteor-data";

const Authorized = ({ path, component }) => {
  const user = useTracker(() => Meteor.user());
  const authenticatedPage = ["/dashboard"];
  const unAuthenticatedPage = ["/", "/register"];
  const isAuthenticatedPage = authenticatedPage.includes(path);
  const isUnauthenticatedPage = unAuthenticatedPage.includes(path);
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