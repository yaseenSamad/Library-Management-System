import { Fragment } from "react";
import { useContext } from "react";
import { allBooksContext } from "../App";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../css/DeleteModal.css";

const DeleteModalAllbooks = ({
  showbookDelete,
  setShowbookDelete,
  allbookkeyelement,
  selectedAllbooks,
}) => {
  const [bookData, setBookData] = useContext(allBooksContext);

  const handleClose = () => setShowbookDelete(false);

  const bookDeleteFunc = (bookid) => {
   
    setBookData(bookData.filter((item) => bookid != item.bookid));
  };

  return (
    <Fragment>
      <Modal className="p-5" show={showbookDelete} onHide={handleClose}>
        <Modal.Title className="deleteModalHeader text-center pt-4 pb-2">
          Delete Book
        </Modal.Title>

        <Modal.Body className="deleteModalBody text-center">
          <p className="deleteModalContent">
            Are you sure, you want to delete Book{" "}
          </p>
        </Modal.Body>
        <div className=" d-flex justify-content-center gap-4 pb-5 pt-3">
          <button className="deleteModalClose" onClick={handleClose}>
            Close
          </button>
          <button
            className="deleteModalDelete"
            onClick={() => {
              bookDeleteFunc(allbookkeyelement);
              handleClose();
            }}
          >
            Delete
          </button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default DeleteModalAllbooks;
