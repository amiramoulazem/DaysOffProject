import * as yup from "yup";

import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import { rejectSchema } from "../../schema-validation/daysoff-schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const ModalsComponent = ({ dayoff }) => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(rejectSchema),
  });
  const [period, setPeriod] = useState([]);

  const [modalState, setModalState] = useState(
    "modal-one" | "modal-two" | ("close" > "close")
  );
  const handleShowModalOne = () => setModalState("modal-one");
  const handleShowModalTwo = () => setModalState("modal-two");
  const handleClose = () => setModalState("close");
  const handleAccept = () => {
    Meteor.call("acceptDayOff", dayoff._id, () => {
      fetch();
      handleClose();
    });
  };
  const handleReject = ({ message }) => {
    Meteor.call("rejectDayOff", { _id: dayoff._id, message }, () => {
      fetch();
      handleClose();
    });
  };

  const fetch = () => {
    Meteor.call("AdminReadPeriod", (err, res) => {
      setPeriod(res);
    });
  };
  return (
    <>
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
      <Modal show={modalState === "modal-one"}>
        <Modal.Header>
          <Modal.Title> Acceptation Response : </Modal.Title>
        </Modal.Header>
        <Modal.Body>would you accept this request ?</Modal.Body>
        <Modal.Footer>
          <div>
            <button
              className="btn btn-secondary btn btn-light"
              onClick={handleClose}
            >
              close
            </button>

            <button
              onClick={handleAccept}
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
              name="message"
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
    </>
  );
};

export default ModalsComponent;
