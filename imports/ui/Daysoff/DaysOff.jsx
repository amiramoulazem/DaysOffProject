import React, { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import Modal from "react-bootstrap/Modal";
import dateschema from "../../schema-validation/daysoff-schema";
import dayGridPlugin from "@fullcalendar/daygrid";
import daysoff from "../../api/daysoff";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const DaysOff = () => {
  const { register, handleSubmit } = useForm({
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
    setDate(DateSelectInfo.startStr);
    setFinalDate(DateSelectInfo.endStr);
    setShow(true);
    let calendar = DateSelectInfo.view.calendar;
    if (onSubmit) {
      calendar.addEvent({
        start: DateSelectInfo.startStr,
        end: DateSelectInfo.endStr,
      /*   allDay: DateSelectInfo.allDay, */
     
      });
    } /* , */
  };

  const onSubmit = (data) => {
    Meteor.call("createPeriod", { data }, (e) => {
      if (!e) {
        setShow(false);
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
    <div className="container">
      {/*  {Meteor.user()?.profile
        ? notyfone.success({ message: Meteor.user()?.profile?.firstName })
        : notyfone.success({ message: Meteor.user()?.username })} */}
      <FullCalendar
        initialView="dayGridMonth"
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        selectable={true}
        editable={true}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        dateClick={handleDateClick}
        events={period.map(({data})=>({title:data.description,start:data.startdate,end:data.enddate}))}
        select={handleDateSelect}
       
        dayMaxEventRows={true} // for all non-TimeGrid views
        views={
          (timeGrid = {
            dayMaxEventRows: 4, // adjust to 4 only for timeGridWeek/timeGridDay
          })
        }
       eventDisplay='auto' 
     
        
      />

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
          <button className="btn btn-outline-danger" variant="secondary" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-outline-success" variant="primary" form="dates">
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DaysOff;
