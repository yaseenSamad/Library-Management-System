import SideBar from "../components/Sidebar";
import MyBooksContainer from "../components/MyBooksContainer";
import '../css/StudentPage.css'


const MyBooks = ({student,studentidget}) => {
    return ( 
        <div className="mybooks-page d-flex gap-md-4  ">
      <div className="sidebar-div col-3 col-md-2 sticky-top">
        <SideBar student = {student} />
      </div>

      <div className=" col-9  ">
        <MyBooksContainer studentidget = {studentidget} />
      </div>
    </div>
     );
}
 
export default MyBooks;