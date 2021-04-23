import { Link, useHistory } from "react-router-dom";

import { Notyf } from "notyf";
import React from "react";

const Dashboard = () => {
  const notyf = new Notyf({
    duration: 2000,
    position: {
      x: "center",
      y: "top",
    },
  });
  history = useHistory();
  const logOut = () => {
    Accounts.logout();
  };

  return (
    <div>
      <div className="navbar navbar-dark">
        <div className="container-xl">
          <div className="navbar-nav flex-row order-md-last">
            <ul className="navbar-nav">
              <li className="nav-item">
                {Meteor.user() ? (
                  <h3> welcome {Meteor.user()?.profile?.firstName}</h3>
                ) : undefined}
              </li>
            </ul>
          </div>
          <div className="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
            <button onClick={logOut}>LogOut</button>
          </div>
        </div>
      </div>

      <div className="row justify-content-center align-items-center h-50 p-5">
        <div className="col-md-9">
          <div className="row row-deck">
            <div className="col-md-4">
              <div className="card">
                <div className="card-status-start bg-green"></div>
                <div className="card-header">
                  <div className="card-title text-center">Wekan Dashboard</div>
                </div>
                <div className="card-body text-center"> user tasks </div>
                <div className="card-footer text-center">
                  <Link to="/Wekan">
                    <button className="btn btn-success">Ckeck</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-status-start bg-green"></div>
                <div className="card-header">
                  <div className="card-title  text-center">
                    Time Tracker Dashboard
                  </div>
                </div>
                <div className="card-body text-center"> Manage your time </div>
                <div className="card-footer text-center">
                  <Link to="/task-tracker">
                    <button className="btn btn-success">Check </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-status-start bg-green"></div>
                <div className="card-header">
                  <div className="card-title text-center">
                    Days Off Dashboard{" "}
                  </div>
                </div>
                <div className="card-body text-center"> ask for days off </div>
                <div className="card-footer text-center">
                  <Link to="/days-off">
                    <button className="btn btn-success"> Check </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
