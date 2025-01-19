import { useState, useContext, useNavigate } from "react";
import { studentContext } from "../App";
import AddStudentModal from "../Modals/AddStudentModal";
import DeleteModalStudent from "../Modals/DeleteModalStudent";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import AllBooksList from "./AllBooksList";
import { Link } from "react-router-dom";
import Profilecard from "./profilecard";

const Studentmain = () => {
  const [studentdata, setStudentdata] = useContext(studentContext);
  const [studentsearchdata, setStudentsearchdata] = useState("");
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [getkeyElement, setGetkeyElement] = useState("");
  const [getkeyoneye, setGetkeyoneye] = useState("");

  const [selectedstudent, setSelectedstudent] = useState(null);
  const [studenteditName, setStudenteditName] = useState("");
  const [studenteditEmail, setStudenteditEmail] = useState("");
  const [studenteditPassword, setStudenteditPassword] = useState("");

  const studentEditFunc = (selected) => {
    setSelectedstudent(selected);
  };

  const studentEditNameget = (data) => {
    // setStudenteditName(data)
  };

  const studentEditEmailget = (data) => {
    // setStudenteditEmail(data)
  };

  const studentEditPasswordget = (data) => {
    // setStudenteditPassword(data)
   
  };
  const studentResetEditFunc = () => {
    setSelectedstudent(null);
  };

  const handleShowStudent = () => setShow(true);
  const handleShowDeleteStudent = () => setShowDelete(true);

  const getkeyFromDelete = (id) => {
    setGetkeyElement(id);
  };

  const studentsearchFunction = (event) => {
    const value = event.target.value;
    setStudentsearchdata(value);
  };

  const studentkeyget = (id) => {
    setGetkeyoneye(id);
  };

  return (
    <div className="div-main ">
      <AddStudentModal
        show={show}
        setShow={setShow}
        selectedstudent={selectedstudent}
        studenteditName={studenteditName}
        studenteditEmail={studenteditEmail}
        studenteditPassword={studenteditPassword}
      />

      <DeleteModalStudent
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        getkeyElement={getkeyElement}
      />
      <p className="main-header pt-5">Students</p>
      <hr />

      <div className="search-btn  d-flex flex-wrap pb-3 ">
        <div className="search-main-icon col-md-6 col-11 d-flex justify-content-around align-items-center mt-2">
          <div className="mainsearch-div">
            <input
              className="inputsearch"
              type="text"
              placeholder="Search by student name or email"
              value={studentsearchdata}
              onChange={studentsearchFunction}
            />
          </div>
          <div>
            <AiOutlineSearch className="searchicon" />
          </div>
        </div>

        <button
          onClick={() => {
            handleShowStudent();
            studentResetEditFunc();
          }}
          className="main-button mt-2"
        >
          {" "}
          Add New Student
        </button>
      </div>

      <div className="studenttable container  text-center  pt-3 pb-5 ">
        <div className="student-row row py-3">
          <div className="col head-student ">Name</div>
          <div className="col  head-student">Email</div>
          <div className="col head-student ">Actions</div>
        </div>

        {studentdata
          ?.filter((data) => {
            if (studentsearchdata === "") {
              return data;
            } else if (
              data.name.toLowerCase().includes(studentsearchdata.toLowerCase())
            ) {
              return data;
            } else if (
              data.email.toLowerCase().includes(studentsearchdata.toLowerCase())
            ) {
              return data;
            }
          })

          .map((item) => (
            <div className="student-row text-center row py-2" key={item.id}>
              <div className="col student-content ">{item.name}</div>

              <div className="col student-content  ">{item.email}</div>

              <div className="col student-content d-flex justify-content-center gap-md-1 ">
                <MdModeEditOutline
                  className="Student-edit"
                  onClick={() => {
                    handleShowStudent();
                    studentEditFunc(item);
                    //    { studentEditNameget(item.name);
                    //     studentEditEmailget(item.email);
                    //     studentEditPasswordget(item.password)}
                  }}
                />

                <RiDeleteBin6Line
                  className="Student-delete"
                  onClick={() => {
                    handleShowDeleteStudent();
                    getkeyFromDelete(item.id);
                  }}
                />
                <Link to={`/students/${item.id}`}>
                  <AiOutlineEye className="Student-eye mb-2" />
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Studentmain;

// onClick={() => {studentkeyget(item.id)}}
