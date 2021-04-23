import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FullCalendar from "@fullcalendar/react";
import Modal from "react-bootstrap/Modal";
import { Notyf } from "notyf";
import { dateschema } from "../../schema-validation/daysoff-schema";
import dayGridPlugin from "@fullcalendar/daygrid";
import daysoff from "../../api/daysoff";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const DaysOff = () => {
  const notyf = new Notyf({
    duration: 2000,
    position: {
      x: "center",
      y: "top",
    },
  });

  const { register, handleSubmit, err } = useForm({
    resolver: yupResolver(dateschema),
  });
  const [period, setPeriod] = useState([]);
  const handleClose = () => setShow(false);
  const [date, setDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [show, setShow] = useState(false);

  handleDateClick = (DateClickInfo) => {
    setDate(DateClickInfo.dateStr);
    setFinalDate(DateClickInfo.dateStr);

    setShow(true);
    console.log("Date: " + DateClickInfo.dateStr);
  };
  handleDateSelect = (DateSelectInfo) => {
    console.log(DateSelectInfo);
    setDate(DateSelectInfo.startStr);
    setFinalDate(DateSelectInfo.endStr);
    setShow(true);
  };

  const onSubmit = (data) => {
    console.log("here");
    Meteor.call("createPeriod", { data }, (e) => {
      if (!e) {
        setShow(false);
        fetch();
      } else console.log("ERROR", e);
    });
  };

  const fetch = () => {
    Meteor.call("readPeriod", (err, data) => {
      setPeriod(data);
    });
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div>
      <div className="navbar navbar-dark">
        <div className="container-xl">
          <div className="navbar-nav flex-row order-md-last">
            <ul className="navbar-nav">
              <li className="nav-item"></li>
            </ul>
          </div>
          <a
            className="nav-link dropdown-toggle waves-effect waves-light"
            id="navbarDropdownMenuLink-5"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            <span className="badge badge-danger ml-2"></span>

            <FontAwesomeIcon icon={faBell} />
          </a>
          <div
            className="dropdown-menu dropdown-menu-lg-right dropdown-secondary"
            aria-labelledby="navbarDropdownMenuLink-5"
          >
            <a className="dropdown-item waves-effect waves-light" href="#">
              Action <span className="badge badge-danger ml-2">4</span>
            </a>
            <a className="dropdown-item waves-effect waves-light" href="#">
              Another action <span className="badge badge-danger ml-2">1</span>
            </a>
            <a className="dropdown-item waves-effect waves-light" href="#">
              Something else here{" "}
              <span className="badge badge-danger ml-2">4</span>
            </a>
          </div>
        </div>
        {/*  <ul className="navbar-nav ml-auto nav-flex-icons">
          <li className="nav-item avatar dropdown">
            <a className="nav-link dropdown-toggle waves-effect waves-light" id="navbarDropdownMenuLink-5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              <span className="badge badge-danger ml-2">4</span>
              <FontAwesomeIcon icon={faBell} />
            </a>
            <div className="dropdown-menu dropdown-menu-lg-right dropdown-secondary" aria-labelledby="navbarDropdownMenuLink-5">
              <a className="dropdown-item waves-effect waves-light" href="#">Action <span className="badge badge-danger ml-2">4</span></a>
              <a className="dropdown-item waves-effect waves-light" href="#">Another action <span className="badge badge-danger ml-2">1</span></a>
              <a className="dropdown-item waves-effect waves-light" href="#">Something else here <span className="badge badge-danger ml-2">4</span></a>
            </div>
          </li>
        </ul>  */}
      </div>
      <div className="container h-50">
        <FullCalendar
          initialView="dayGridMonth"
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin,
          ]}
          selectable={true}
          editable={true}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          dateClick={handleDateClick}
          events={period.map(({ data }) => ({
            title: data.description,
            start: data.startdate,
            end: data.enddate,
            allDay: false,
          }))}
          displayEventTime={false}
          select={handleDateSelect}
          dayMaxEventRows={true} // for all non-TimeGrid views
          views={
            (timeGrid = {
              dayMaxEventRows: 4, // adjust to 4 only for timeGridWeek/timeGridDay
            })
          }
          eventColor="purple"
          eventDisplay="auto"
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Select Period</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="form-group row"
            onSubmit={handleSubmit(onSubmit)}
            id="dates"
          >
            <label className="form-label">Starting Date</label>
            <input
              name="startdate"
              ref={register}
              defaultValue={date}
              type="date"
              className="form-control form-control-rounded mb-2"
            />
            <label className="form-label">Ending Date</label>
            <input
              name="enddate"
              ref={register}
              defaultValue={finalDate}
              type="date"
              className="form-control form-control-rounded mb-2"
            />
            <label className="form-label">Description</label>
            <input
              ref={register}
              type="text"
              name="description"
              className="form-control form-control-rounded mb-2"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-outline-danger"
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="btn btn-outline-success"
            variant="primary"
            form="dates"
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DaysOff;
