import ModalsComponent from "./ModalsComponent";
import React from "react";

const ListOfrequests = ({ dayoff }) => {
  return (
    <>
      <td>{dayoff.user.profile.firstName}</td>

      <td>{dayoff.data.description}</td>

      <ModalsComponent dayoff={dayoff} />
    </>
  );
};

export default ListOfrequests;
