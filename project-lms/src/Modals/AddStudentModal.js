import React, { useState, useContext, useEffect } from "react";
import { studentContext } from "../App";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../css/StudentAddModal.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Fragment } from "react";

const AddStudentModal = ({ show, setShow, selectedstudent }) => {
  const [studentdata, setStudentdata] = useContext(studentContext);

  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [studentPasswordTwo, setStudentPasswordTwo] = useState("");



  useEffect(() => {
    setStudentName(selectedstudent?.name);
    setStudentEmail(selectedstudent?.email);
    setStudentPassword(selectedstudent?.password);
    setStudentPasswordTwo(selectedstudent?.password);
  }, [selectedstudent]);

  const handleCloseStudent = () => setShow(false);

  const StudentNameFunction = (event) => {
    const value = event.target.value;
    setStudentName(value);
   
  };

  const notify = (text) => {
    toast.error(text, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  }




  const passwordlimit = () => {
    toast.error("password doesnt match", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }



  const handleAddStudent = () => {
    if (
      studentName &&
      studentEmail &&
      studentPassword &&
      studentPasswordTwo !== ""
    ) {
      if (studentPassword === studentPasswordTwo  ) {
       
        if(studentPassword.length > 4 && studentPassword.length < 11 ){
       
        const newid = new Date().getTime();
       
        const setdata = {
          id: newid,
          name: studentName,
          email: studentEmail,
          password: studentPassword,
          position: "student",
        };

        setStudentdata([...studentdata, setdata]);
       

        setShow(false);
        setStudentName("");
        setStudentEmail("");
        setStudentPassword("");
        setStudentPasswordTwo("");
      }else{
        notify("password should be greater than 4 characters")
      }
      } else {
       notify('please make sure,password is matching') 
      }
    } else {
      // alert('please fill out form')
      notify("please fill out the form");
    }
  };

  const handleEditStudent = () => {
    if (
      studentName &&
      studentEmail &&
      studentPassword &&
      studentPasswordTwo !== ""
    ) {
      if (studentPassword === studentPasswordTwo) {
        if(studentPassword.length > 4 && studentPassword.length < 11 ){
       

        setStudentdata((studentdata) =>
          studentdata.map((obj) => {
            if (obj.id === selectedstudent.id) {
              return {
                ...obj,
                name: studentName,
                email: studentEmail,
                password: studentPassword,
              };
            }

            return obj;
          })
        );
       
        handleCloseStudent();
      }else{
        notify("password should be greater than 4 characters")
      }
      } else {
        notify('please make sure,password is matching') 
      }
    } else {
      notify("please fill out the form");
    }
  };

  return (
    <Fragment>
      <Modal show={show} onHide={handleCloseStudent}>
        <Modal.Header closeButton>
          <Modal.Title className="studentModalTitle">
            {selectedstudent ? "Edit Student" : "Add Student"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="studentModalLabel">Name</Form.Label>
              <Form.Control
                className="addModalName"
                onChange={StudentNameFunction} //(event) => setStudentName(event.target.value)
                value={studentName || ""}
                type="text"
                maxLength={25}
                placeholder="Eg: John Doe"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label className="studentModalLabel">Email</Form.Label>
              <Form.Control
                className="addModalemail"
                onChange={(event) => setStudentEmail(event.target.value)}
                value={studentEmail || ""}
                type="email"
                maxLength={25}
                placeholder="Eg: johndoe@gmail.com"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label className="studentModalLabel">Password</Form.Label>
              <Form.Control
                value={studentPassword || ""}
                onChange={(event) => setStudentPassword(event.target.value)}
                type="password"
                placeholder="••••••••"
                maxLength={10}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label className="studentModalLabel">
                Confirm Password
              </Form.Label>
              <Form.Control
                value={studentPasswordTwo || ""}
                onChange={(event) => setStudentPasswordTwo(event.target.value)}
                type="password"
                placeholder="••••••••"
                maxLength={10}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="StudentModal-ButtonClose"
            onClick={handleCloseStudent}
          >
            Close
          </button>
          <button
            className="StudentModal-ButtonAdd"
            onClick={() => {
              
              {
                selectedstudent ? handleEditStudent() : handleAddStudent();
              }
            }}
          >
            {selectedstudent ? "Edit Student" : "Add Student"}
          </button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="coloured"
      />
      {/* Same as */}
      <ToastContainer />
    </Fragment>
  );
};

export default AddStudentModal;
