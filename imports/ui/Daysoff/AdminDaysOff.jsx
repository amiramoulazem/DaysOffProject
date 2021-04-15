import React, { useEffect, useState }  from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FullCalendar from "@fullcalendar/react";
import { Meteor } from "meteor/meteor";
import Modal from "react-bootstrap/Modal";
import dateschema from "../../schema-validation/daysoff-schema";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ioMdLogOut } from '@fortawesome/free-solid-svg-icons'
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useForm } from "react-hook-form";
import {useHistory} from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup";

const AdminDaysOff = () => {
  const { register, handleSubmit, err } = useForm({
    resolver: yupResolver(dateschema),
  });
  const [period, setPeriod] = useState([]);

  const [modalState, setModalState] = useState(
    "modal-one" | "modal-two" | ("close" > "close")
  );
  const handleShowModalOne = () => setModalState("modal-one");
  const handleShowModalTwo = () => setModalState("modal-two");
  const handleClose = () => setModalState("close");
  history = useHistory();
  const logOut = () => {
    Accounts.logout();
    };
  const handleAccept = () => {
    console.log("here");
    Meteor.call("acceptDayOff", (_id) => {
      fetch();
    });
  };
  const handleReject = () => {
    Meteor.call("rejectDaysOff", (_id) => {
      fetch();
    });
  };
  const fetch = () => {
    Meteor.call("readPeriod", (err, res) => {
      setPeriod(res);
    });
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <div className="navbar navbar-dark">
        <div className="container-xl">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link">
                <span className="nav-link-title">List of users </span>
              </a>
            </li>
          </ul>
          <div className="navbar-nav flex-row order-md-last">
            <ul className="navbar-nav">
              <li className="nav-item"></li>
            </ul>
          </div>
          <div className="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
            {/* <button className="btn btn-light" onClick={logOut}>LogOut</button> */}
            <button type="button" className="btn btn-default btn-sm" onClick={logOut}>
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
                <div className="container">
                  <FullCalendar
                  initialView="dayGridMonth"
                  plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    listPlugin,
                    interactionPlugin,
                  ]}
                  events={period.map(({ data }) => ({
                    groupId: data.userId,
                    title: data.description,
                    start: data.startdate,
                    end: data.enddate,
                  }))}
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
                </div>
              </div>
            </div>
            <div className="tab-pane active" id="req">
              <div className="container my-md-3">
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
                    <tr>
                      {period.map(({ userId }) => {
                        return (
                          <>
                            <td>{userId}</td>
                            {period.map(({ data }) => {
                              return <td key={data._id}>{data.description}</td>;
                            })}
                          </>
                        );
                      })}

                      <td>
                        <div className="d-flex justify-content-center">
                          <button
                            form="request"
                            className="btn btn-success"
                            onClick={handleShowModalOne}
                          >
                            Accept
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <button
                            form="request"
                            className="btn btn-danger"
                            onClick={handleShowModalTwo}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={modalState === "modal-one"}>
        <Modal.Header>
          <Modal.Title> Acceptation Response : </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(handleAccept)}
            className="form-group row"
            id="acceptationResponse"
          >
            <label className="form-label">message : </label>
            <input
              ref={register}
              type="text"
              name="reason"
              className="form-control form-control-rounded mb-2"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <button
              className="btn btn-secondary btn btn-light"
              onClick={handleClose}
            >
              close
            </button>

            <button
              form="acceptationResponse"
              className="btn btn-primary btn btn-info"
            >
              Send
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal show={modalState === "modal-two"}>
        <Modal.Header>
          <Modal.Title> Rejection Response : </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(handleReject)}
            className="form-group row"
            id="rejectionResponse"
          >
            <label className="form-label">message : </label>
            <input
              ref={register}
              type="text"
              name="reason"
              className="form-control form-control-rounded mb-2"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <button className="btn btn-light" onClick={handleClose}>
              close
            </button>

            <button form="rejectionResponse" className="btn btn-info">
              Send
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDaysOff;
