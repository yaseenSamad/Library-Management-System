import React, { Fragment, useState, useContext } from "react";
import { studentContext } from "../App";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../css/DeleteModal.css";

const DeleteModalStudent = ({ showDelete, setShowDelete, getkeyElement }) => {
  const [studentdata, setStudentdata] = useContext(studentContext);

  const handleClose = () => setShowDelete(false);

  const studentDeleteFunc = (deleteid) => {
  
    setStudentdata(studentdata.filter((item) => deleteid != item.id));
  };

  return (
    <Fragment>
      <Modal className="p-5" show={showDelete} onHide={handleClose}>
        <Modal.Title className="deleteModalHeader text-center pt-4 pb-2">
          Delete Student
        </Modal.Title>

        <Modal.Body className="deleteModalBody text-center">
          <p className="deleteModalContent">
            Are you sure, you want to delete Student
          </p>
        </Modal.Body>
        <div className=" d-flex justify-content-center gap-4 pb-5 pt-3">
          <button className="deleteModalClose" onClick={handleClose}>
            Close
          </button>
          <button
            className="deleteModalDelete"
            onClick={() => {studentDeleteFunc(getkeyElement);handleClose()}}
          >
            Delete
          </button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default DeleteModalStudent;
