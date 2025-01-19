import SideBar from "../components/Sidebar";
import Studentmain from "../components/StudentContainer";

const Student = () => {
  return (
    <div className="student-main d-flex gap-md-4  ">
      <div className="sidebar-div col-3 col-md-2 sticky-top">
        <SideBar student = {false}/>
      </div>

      <div className=" col-9  ">
        <Studentmain />
      </div>
    </div>
  );
};

export default Student;
