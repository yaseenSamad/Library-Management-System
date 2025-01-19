import { AiOutlineSearch } from "react-icons/ai";
import Dropdown from 'react-bootstrap/Dropdown';
import '../css/StudentPage.css'
import { AiOutlineEye } from "react-icons/ai";
import { useContext } from "react";
import { allBooksContext } from "../App";
import { useState } from "react";



const StudentAllBooksContainer = () => {
  const [bookData, setBookData] = useContext(allBooksContext);
  const [studentAllBooksSearchState,setStudentAllBooksSearchState] = useState('')
  const [studentAllbooksSortState,setStudentAllbooksSortState] = useState(0)

  const studentAllBooksSearch = (e) => {
    const value = e.target.value;
    setStudentAllBooksSearchState(value)
  }
  const sortTitle = () =>{
    setStudentAllbooksSortState(1)
  }
  const sortAuthor = () =>{
    setStudentAllbooksSortState(2)
  }

  if(studentAllbooksSortState == 1){
      
    bookData.sort((a, b) => {
      return  a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;;
  });

  }

  if(studentAllbooksSortState == 2){
      
    bookData.sort((a, b) => {
      return  a.author.toLowerCase() < b.author.toLowerCase() ? -1 : 1;;
  });

  }




    return ( 
        
        <div className="container-student-page ">

        <p className="container-student-page-header pt-5">All Books</p>
        <hr />

<div className="search-sort-div  d-flex flex-wrap pb-3 ">
        <div className="search-main-icon col-md-6 col-11 d-flex justify-content-around align-items-center mt-2">
          <div className="mainsearch-div">
            <input
              className="inputsearch"
              type="text"
              placeholder="Search by book title or author"
              onChange = {studentAllBooksSearch}
            
            
            />
          </div>
          <div>
            <AiOutlineSearch className="searchicon" />
          </div>
        </div>

        <div className="d-flex pt-3 gap-md-2">
        <p className="sort-para mt-2 m-0 ">Sort By :</p>
        <Dropdown className=" dropdown-student d-inline  ">
        <Dropdown.Toggle id="dropdown-autoclose-true ">
         <span className="pe-5 ps-1">Book Title</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={sortTitle}>Book Title</Dropdown.Item>
          <Dropdown.Item onClick={sortAuthor}>Author</Dropdown.Item>
          
        </Dropdown.Menu>
      </Dropdown>
      </div>

 </div>



 <div className="student-form-container container  text-center mt-5 pt-3 pb-5">
 <div className="student-form-field row py-3">
   <div className="col student-form-title">Book Title</div>
   <div className="col student-form-title">Author</div>
   <div className="col student-form-title"> Language</div>
   <div className="col student-form-title"> Total Copies</div>
   <div className="col student-form-title"> Remaining</div>
   <div className="col student-form-title">Actions</div>
 </div>

 {bookData
  ?.filter((data) => {
  if (studentAllBooksSearchState === "") {
    return data;
  } else if (
    data.title.toLowerCase().includes(studentAllBooksSearchState.toLowerCase())
  ) {
    return data;
  } else if (
    data.author.toLowerCase().includes(studentAllBooksSearchState.toLowerCase())
  ) {
    return data;
  }
})
  
  
  .map((bookobj)=> {

   

 return(
 <div className="student-form-field row py-2" >
    <div className="col student-form-data flex-wrap">{bookobj.title}</div>
    <div className="col student-form-data flex-wrap">{bookobj.author}</div>
    <div className="col student-form-data">{bookobj.language}</div>
    <div className="col student-form-data">{bookobj.totalcopies}</div>
    <div className="col student-form-data">{bookobj.remaining}</div>
    <div className="col student-form-data "><AiOutlineEye className="student-eye"/></div>
</div>
 )
} )
}


 </div>


        </div>
     );
}
 
export default StudentAllBooksContainer;