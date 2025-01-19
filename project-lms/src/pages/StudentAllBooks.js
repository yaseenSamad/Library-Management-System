import SideBar from "../components/Sidebar";
import StudentAllBooksContainer from "../components/StudentAllBooksContainer";
import '../css/StudentPage.css'


const StudentAllBooks = () => {
    return ( 
        <div className="studentallbooks-page d-flex gap-md-4  ">
      <div className="sidebar-div col-3 col-md-2 sticky-top">
        <SideBar  student = {true}/>
      </div>

      <div className=" col-9  ">
      <StudentAllBooksContainer/>
      </div>
    </div>
     );
}
 
export default StudentAllBooks;