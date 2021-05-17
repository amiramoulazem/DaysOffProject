import React, { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import ListOfrequests from "./ListOfrequests";
import { Meteor } from "meteor/meteor";
import Modal from "react-bootstrap/Modal";
import ModalsComponent from "./ModalsComponent";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useHistory } from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data'

const AdminDaysOff = () => {
  const [period, setPeriod] = useState([]);
  const [show, setShow] = useState(false);
  const [eventDate, setEventDate] = [];
  const handleClose = () => setShow(false);
  history = useHistory();
  const logOut = () => {
    Accounts.logout();
  };

  const fetch = () => {
    Meteor.call("AdminReadPeriod", (err, res) => {
      setPeriod(res);
    });
  };
 useTracker(() => {
    fetch();
  }, []);
  const handleEventClick = (event) => {
    setShow(true);
  };

  return (
    <div>
    {fetch()}
      <div className="navbar navbar-dark">
        <div className="container-xl">
          <ul className="navbar-nav">
            <li className="nav-item">
              {Meteor.user() ? (
                <p> welcome admin {Meteor.user()?.profile?.firstName}</p>
              ) : undefined}
            </li>
          </ul>
          {/*           <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link">
                <span className="nav-link-title">List of users </span>
              </a>
            </li>
          </ul> */}
          <div className="navbar-nav flex-row order-md-last">
            <ul className="navbar-nav">
              <li className="nav-item"> </li>
            </ul>
          </div>
          <div className="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
            <button
              type="button"
              className="btn btn-default btn-sm"
              onClick={logOut}
            >
              <span className="glyphicon glyphicon-log-out"></span> Log out
            </button>
          </div>
        </div>
      </div>
      <div className="card">
        <ul className="nav nav-tabs" data-bs-toggle="tabs">
          <li className="nav-item">
            <a
              href="#calendar"
              className="nav-link active"
              data-bs-toggle="tab"
            >
              Calendar
            </a>
          </li>
          <li className="nav-item">
            <a href="#req" className="nav-link" data-bs-toggle="tab">
              requests
            </a>
          </li>
        </ul>
        <div className="card-body">
          <div className="tab-content">
            <div className="tab-pane active show" id="calendar">
              <div>
                <div className="container w-75 p-3 h-75">
                  <FullCalendar
                    editable={true}
                    initialView="dayGridMonth"
                    plugins={[
                      dayGridPlugin,
                      timeGridPlugin,
                      listPlugin,
                      interactionPlugin,
                    ]}
                    displayEventTime={false}
                    events={period.map(({ data }) => ({
                      title: data.description,
                      start: data.startdate,
                      end: data.enddate,
                      allDay: true,
                      extendedProps: data,
                    }))}
                    eventClick={handleEventClick}
                    headerToolbar={{
                      left: "prev,next today",
                      center: "title",
                      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                    }}
                    eventColor="purple"
                    views={
                      (timeGrid = {
                        dayMaxEventRows: 6,
                      })
                    }
                  />
                  <Modal show={show}>
                    <Modal.Header>
                      <Modal.Title> more informations </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="justify-content-center">{}</div>
                    </Modal.Body>
                    <Modal.Footer>
                      <div className="row justify-content-between">
                        <div className="col-auto">
                          <button
                            className="btn btn-secondary btn btn-light"
                            onClick={handleClose}
                          >
                            close
                          </button>
                        </div>
                        <div className="col-auto">
                          <div>
                            <ModalsComponent key={period._id} />
                          </div>
                        </div>
                      </div>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
            <div className="tab-pane active" id="req">
              <div className="container w-75 p-3 h-75">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th> User Name </th>
                      <th> Reason </th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {period.map((dayoff) => {
                      return (
                        <tr>
                          <ListOfrequests dayoff={dayoff} />
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDaysOff;
