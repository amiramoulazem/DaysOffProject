import React, { useEffect, useState } from "react";
import { faBell, faLessThanEqual } from "@fortawesome/free-solid-svg-icons";

import Badge from "@material-ui/core/Badge";
import BellIcon from "react-bell-icon";
import { DaysOff } from "../../api/daysoff";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FullCalendar from "@fullcalendar/react";
import MailIcon from "@material-ui/icons/Mail";
import { Meteor } from "meteor/meteor";
import Modal from "react-bootstrap/Modal";
import Notifications from "./Notifications";
import { Tracker } from "meteor/tracker";
import { dateschema } from "../../schema-validation/daysoff-schema";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useForm } from "react-hook-form";
import { useTracker } from "meteor/react-meteor-data";
import { yupResolver } from "@hookform/resolvers/yup";

const UserDaysOff = () => {
  
  

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
    Meteor.call("createPeriod", { data }, (e) => {
      if (!e) {
        setShow(false);
        fetch();
      } else console.log("ERROR", e);
    });
  };

  const fetch = () => {
    Meteor.call("UserReadPeriod", (err, data) => {
      setPeriod(data);
    });
  };
  useTracker(() => {
    fetch();
  }, []);
  const [showBadge, setShowBadge] = useState({
    show: false,
    count: 0,
  });
  const handleClick = () => {
    setShowBadge({ show: true, count: 0 });
    console.log(showBadge);
  };
  return (
    <div>
      <div className="navbar navbar-dark">
        <div className="container-xl">
          <div className="navbar-nav flex-row order-md-last">
            <ul className="navbar-nav">
              <li className="nav-item"></li>
            </ul>
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <Badge  badgeContent={+1} color="secondary">
                <BellIcon
                  width="20"
                  height="20"
                  color="white"
                  active={true}
                  animate={true}
                />
              </Badge>
              {showBadge == false ? (
                <Badge badgeContent={count}></Badge>
              ) : undefined}
            </Dropdown.Toggle>

            <Dropdown.Menu onClick={handleClick}>
              {period.map((dayoff) => {
                return <Notifications key={dayoff._id} dayoff={dayoff} />;
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="container w-50 p-3 h-40">
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
          dayMaxEventRows={true}
          views={
            (timeGrid = {
              dayMaxEventRows: 4,
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

export default UserDaysOff;
