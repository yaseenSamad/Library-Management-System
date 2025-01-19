import { Fragment } from "react";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../css/ReturnModal.css";
import { useContext } from "react";
import { issuebooksContext } from "../App";
import { allBooksContext } from "../App";

const IssueReturn = ({
  returnshow,
  setReturnShow,
  returnkey,
  setIsreturnstate,
  issueidbook,
}) => {
  const [issuestate, setIssuestate] = useContext(issuebooksContext);
  const [bookData, setBookData] = useContext(allBooksContext);
  // const [returndatestate,setReturndatestate] = useState('')

  const handleReturnClose = () => setReturnShow(false);

  const setReturnFunc = (returnkey) => {
    console.log("hi", returnkey);
    let updatestate = issuestate?.map((issueobj) => {
      if (issueobj?.Issueid === returnkey) {
        // setReturndatestate(newdateformat)

        let RemainingIncrease = bookData?.map((bookobj) => {
          if (bookobj?.bookid === issueobj?.issuebookid) {
            return { ...bookobj, remaining: bookobj.remaining + 1 };
          }
          return bookobj;
        });
        setBookData(RemainingIncrease);
        const newdate = new Date();
      const  newmonth =  newdate.getMonth() + 1
        const newdateformat =
        newdate.getDate()  +
          "-" +
          newmonth + 
          "-" +
          newdate.getFullYear();
        console.log(newdateformat, "gbtt");

        const tempdateformat =
        newmonth +
          "-" +
          newdate.getDate()    +
          "-" +
          newdate.getFullYear();
        console.log(newdateformat, "gbtt");



        return { ...issueobj, isreturn: true, isreturndate: newdateformat , tempreturndate : tempdateformat};
      }

      return issueobj;
    });
    setIssuestate(updatestate);
    console.log(issuestate, "uuuuhh");
  };

 

  return (
    <Fragment>
      <Modal show={returnshow} onHide={handleReturnClose}>
        <Modal.Title className="returnModalHeader text-center pt-4 pb-2">
          Mark as returned?
        </Modal.Title>

        <Modal.Body className="deleteModalBody text-center">
          <p className="returnModalContent">
            Are you sure to mark this book as returned?
          </p>
        </Modal.Body>
        <div className=" d-flex justify-content-center gap-4 pb-5 pt-3">
          <button className="returnModalClose" onClick={handleReturnClose}>
            No
          </button>
          <button
            className="returnModalreturn"
            onClick={() => {
              handleReturnClose();
              setReturnFunc(returnkey);
            }}
          >
            Yes
          </button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default IssueReturn;


