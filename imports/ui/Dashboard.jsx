import React from "react";

const Dashboard = () => {
  const logOut = () => {
    Accounts.logout();
  };
  return (
     <div>
      <div className="container full-height">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h1 className="card-title h3 mb-0"> Wekan </h1>
              </div>
              <div className="card-footer text-center ">
              <button className="btn btn-indigo"onClick={logOut}>log out </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
