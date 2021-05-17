import { Dropdown } from "react-bootstrap";
import React from "react";

const Notifications = ({ dayoff }) => {
 
  return (
    <div>
      {dayoff.response === true ? (
        <Dropdown.Item href="#notification1">
          your days off : <b> {dayoff.data.description} </b> has been accepted !
        </Dropdown.Item>
      ) : dayoff.response === false ? (
        <Dropdown.Item href="#notification2">
          {" "}
          your days off :{""} <b> {dayoff.data.description} </b> has been rejected ,
          the admin said : <b> {dayoff.message} </b>{" "}
        </Dropdown.Item>
      ) : undefined}
    </div>
  );
};

export default Notifications;
