import { Fragment } from "react";
import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useContext } from "react";
import { studentContext } from "../App";
import { allBooksContext } from "../App";
import { issuebooksContext } from "../App";
import IssueReturn from "./ReturnModal";
import '../css/IssueModal.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const IssueBookModal = ({ show, setShow }) => {
  const [issuestate, setIssuestate] = useContext(issuebooksContext);
  const [studentdata, setStudentdata] = useContext(studentContext);
  const [bookData, setBookData] = useContext(allBooksContext);

  const DuedateInput = useRef();

  const [issueidbook, setissueidbook] = useState("");
  const [issueidstudent, setissueidstudent] = useState("");
  const [issuedateissue, setIssuedateissue] = useState("");
  const [issueduedate, setIssueduedate] = useState("");
  const [issuefine, setIssuefine] = useState("");
  const [issueremainingget, setIssueremainingget] = useState();

  const [duedatetwo, setDuedatetwo] = useState("");
  const [issuedatetwo, setIssuedatetwo] = useState("");

  const issueBooksNotify = (text) => {
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
  };

  const IssuebookStateFunc = (event) => {
    const val = event.target.value;
    setissueidbook(val);
  
  };

  const IssuestudentStateFunc = (event) => {
    const val = event.target.value;
    setissueidstudent(val);
   
  };

  const issueDateFunc = (event) => {
    const val = event.target.value;
   
    setIssuedatetwo(val);

    const splitval = val.split("-");
    const setyear = splitval[0];
    const setmonth = splitval[1];
    const setday = splitval[2];
    const setval = setmonth + "-" + setday + "-" + +setyear;

    
    setIssuedateissue(setval);

///////
const date = new Date(setval);
const dateCopy = new Date(date.getTime());
dateCopy.setDate(dateCopy.getDate() + 7);
console.log(dateCopy);
console.log(date);
console.log(dateCopy.getDate(),"kk")
console.log(dateCopy.getMonth()+1,"kk")
console.log(dateCopy.getFullYear(),"kk")
var datedue =  dateCopy.getFullYear()+ "-" + (dateCopy.getMonth()+1) + "-" + dateCopy.getDate()
console.log(datedue,"ffh")
DuedateInput.current.value = datedue
/////

setDuedatetwo(datedue);

const splitdueval = datedue.split("-");
const setdueyear = splitdueval[0];
const setduemonth = splitdueval[1];
const setdueday = splitdueval[2];
const setdueval = setduemonth + "-" + setdueday + "-" + setdueyear;

console.log(setdueval,"sdv")

setIssueduedate(setdueval);
console.log(issueduedate, "hooi");

///////
 



  };



  const handleClose = () => setShow(false);

  const addIssueBookFunc = () => {
    // if(issuedateissue < duedatetwo){
      if(issueidbook && issueidstudent && issuedateissue && issueduedate != ""){

    const Issueid = Math.floor(Math.random() * Date.now());
    const setarray = {
      Issueid: Issueid,
      issuebookid: issueidbook,
      issuestudentid: issueidstudent,
      issuedate: issuedateissue,
      duedate: issueduedate,
      isreturn: false,
      isissue: true,
      isreturndate : "",
      tempreturndate : ""
    };
   
    
    setIssuestate([...issuestate, setarray]);
    handleClose()
    setissueidbook("")
    setissueidstudent("")
    setIssuedateissue("")
    setIssueduedate("")
    
  }
  else{
    issueBooksNotify('please fill out the form')
  }
    // }
    // else{
    //   alert("please enter valid date")
    // }
  };

  const RemainingDecreaseFunc = () => {
    setBookData(
      bookData?.map((bookobj) => {
        if (bookobj?.bookid === issueidbook) {
          return { ...bookobj, remaining: bookobj.remaining - 1 };
        }
        return bookobj;
      })
    );
    // }
  };

  return (
    <Fragment>
      <Modal className="px-3 " show={show} onHide={handleClose}>
        <IssueReturn issueidbook={issueidbook} />
        <Modal.Header className="IssueBookModalHeader mx-4 ps-0" closeButton>
          <Modal.Title className="IssueBookModalTitle">
            {" "}
            Issue Book{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4">
          <Form>
            <Form.Label className="IssueBookModalLabel mb-1">Book</Form.Label>

            <Form.Select
            className="issuemodalbookname p-2"
              onChange={IssuebookStateFunc}
              aria-label="Default select example"
            >
              <option>Select Book</option>

              {bookData.map((obj) => {
                if (obj.remaining > 0) {
                  return (
                    <Fragment key={obj.bookid}>
                      <option value={obj.bookid}>{obj.title}</option>
                    </Fragment>
                  );
                }
              })}
            </Form.Select>

            <Form.Label className="IssueBookModalLabel mb-1">Student</Form.Label>

            <Form.Select
            className="issuemodalstudentname p-2"
              onChange={IssuestudentStateFunc}
              aria-label="Default select example"
            >
              <option>Select Student </option>
              {studentdata.map((obj) => {
                return (
                  <Fragment key={obj.id}>
                    <option value={obj.id}>{obj.name}</option>
                  </Fragment>
                );
              })}
            </Form.Select>

            <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
              <Form.Label className="IssueBookModalLabel mb-1">
                Issue Date
              </Form.Label>

              <Form.Control
              className="issuedatemodal p-2"
                type="Date"
                placeholder="09-11-2022"
                onChange={issueDateFunc}
              />
            </Form.Group>

            <Form.Group className="mb-3 " controlId="exampleForm.ControlInput2">
              <Form.Label className="IssueBookModalLabel mb-1">Due Date</Form.Label>
              <Form.Control
              className="issueduedatemodal p-2"
                type="date"
                // onChange={dueDateFunc}
                 ref={DuedateInput}
                  // readOnly
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="mx-4">
          <button className="IssueBookCloseBtn" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="IssueBookAddBtn"
            onClick={() => {
              addIssueBookFunc();
              RemainingDecreaseFunc();
             
            }}
          >
            Issue Book
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

export default IssueBookModal;
