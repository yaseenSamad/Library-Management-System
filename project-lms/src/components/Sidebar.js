import { Link } from "react-router-dom";
import whiteLogo from "../assets/whiteLogo.png";
import { MdTaskAlt } from "react-icons/md";
import { MdMenuBook } from "react-icons/md";
import { MdOutlinePeopleAlt } from "react-icons/md";
import "../css/SideBar.css";
import { useContext, useState } from "react";
import dp from '../assets/person2.png'



const SideBar = ({student}) => {

  
 
  const [studentpagemybooks,setStudentpagemybooks] = useState(true)
  const [studentpageallbooks,setStudentpageallbooks] = useState(false)


  const mybooksactive = () => {
    setStudentpagemybooks(false)
    setStudentpageallbooks(true)
  }

  const studentallactive = () => {
    setStudentpagemybooks(true)
    setStudentpageallbooks(false)
  }


  return (
    <div className="SideBar" style={{backgroundColor : student ? "#303179": "#ed7966"}}>
      <div className="">
        <div className="loginhead d-flex gap-3 pt-4 ps-4 flex-wrap">
          <img className="whitelogo" src={whiteLogo} alt="logo" />
          <h1 className="mt-2 whitetext">LMS</h1>
        </div>

        <div  className ="sidebtn gap-4 ms-md-1"   >

       {student && <Link to="/mybooks">
  
            <button className="sidebuttons  d-flex gap-md-2 ps-md-3 p-md-2 " style={{backgroundColor :  student ? "#303179" : "#ed7966" }}
            onClick ={mybooksactive}>
              {" "}
              <MdTaskAlt className="sidemd" /> My Books
            </button>
          </Link>}

          {!student && <Link to="/issued-books">
            <button className="sidebuttons  d-flex gap-md-2 ps-md-3 p-md-2 "  >
              {" "}
              <MdTaskAlt className="sidemd" /> Issued Books
            </button>
          </Link>}

           <Link to={!student ? "/all-books" : "/student-allbooks"}>
            <button className="sidebuttons  d-flex gap-md-2 ps-md-3  p-md-2" onClick ={studentallactive}
             style={{backgroundColor : student ? "#303179" : "#ed7966"  }}>
              {" "}
              <MdMenuBook className="sidemd" /> All Books
            </button>
          </Link>

          {!student && <Link to="/students">
            <button className="sidebuttons  d-flex gap-md-2  ps-md-3  p-md-2">
              {" "}
              <MdOutlinePeopleAlt className="sidemd" /> Students
            </button>
          </Link>}

        </div>

        <div>
        <div className="bottomdiv  mx-lg-3 ">
        
          <div className="d-flex flex-wrap  gap-lg-3 pt-3" >
          <img src={dp} className = "person-sidebar "/>
          <p className="m-0 mt-2 flex-wrap ">Mayor Smith</p>
          </div>
          <div className="m-0 ms-lg-4  "> mayorsmith@gmail.com</div>
         
        </div>
        </div>


      </div>

   
    </div>
  );
};

export default SideBar;


