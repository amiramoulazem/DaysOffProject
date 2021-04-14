import React, { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import { Meteor } from "meteor/meteor";
import Modal from "react-bootstrap/Modal";
import dateschema from "../../schema-validation/daysoff-schema";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const AdminDaysOff = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(dateschema),
  });
  const [period, setPeriod] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [message, setMessage] = useState([]);
  const [validation, setValidation] = useState([]);
  const logOut = () => {
    Accounts.logout();
  };

  const fetch = () => {
    Meteor.call("readPeriod", (err, res) => {
      setPeriod(res);
    });
  };
  useEffect(() => {
    fetch();
  }, []);
  const daysoffValidation = (data) => {
 
    Meteor.call("daysoffValidation", {data}, (err, res) => {
      console.log(data)
      fetch();
      setShow(false);
    });
  };

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
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link">
                <span className="nav-link-title">Calendar</span>
              </a>
            </li>
          </ul>
          <div className="navbar-nav flex-row order-md-last">
            <ul className="navbar-nav">
              <li className="nav-item"></li>
            </ul>
          </div>
          <div className="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
            <button onClick={logOut}>LogOut</button>
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
              {" "}
              Calendar{" "}
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
            <div className="tab-pane active" id="req">
              <div className="container my-md-3">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th> User Name </th>
                      <th> Reason </th>
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
                            className="btn btn-info "
                            onClick={handleShow}
                          >
                            Respond
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

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title> Request </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(daysoffValidation())}
            className="form-group row"
            id="request"
          >
            <label className="form-label">message : </label>
            <input
              ref={register}
              type="text"
              name="reason"
              className="form-control form-control-rounded mb-2"
            />
             <button>save</button>
          </form>
         
        </Modal.Body>
        <Modal.Footer>
          <div className="row justify-content-between">
            <div className="col-auto">
              <button className="btn btn-light" onClick={handleClose}>
                close
              </button>
            </div>
            <div className="col-auto">
              <div className="btn-group">
                <button  form="request" className="btn btn-danger">
                  Reject
                </button>
                <button form="request" className="btn btn-success">
                  Accept
                </button>
              </div>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDaysOff;
