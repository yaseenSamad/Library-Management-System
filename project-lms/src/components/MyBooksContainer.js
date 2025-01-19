import { AiOutlineSearch } from "react-icons/ai";
import Dropdown from 'react-bootstrap/Dropdown';
import '../css/StudentPage.css'
import { useContext, useEffect } from "react";
import { studentContext } from "../App";
import { allBooksContext } from "../App";
import { issuebooksContext } from "../App";
import { useState } from "react";
import MyBooksListHeader from "./MyBooksListHeader";





const MyBooksContainer = ({studentidget}) => {

 
  const [studentdata, setStudentdata] = useContext(studentContext);
  const [bookData, setBookData] = useContext(allBooksContext);
  const [issuestate, setIssuestate] = useContext(issuebooksContext);
  const [tempmybooks,setTempMyBooks] = useState([])
  const [myBooksSearchState,setMyBooksSearchState] = useState('')

  const [mybooksissued,setMybooksissued] = useState(true)
  const [mybooksreturned,setMybooksreturned] = useState(false)
   const [mybookspending,setMybookspending] = useState(false)
   const [sortMyBooks,setSortMyBooks] =useState(0)
  
  useEffect(() =>{
    studentdata.map((studentobj) => {

    
      
      if(studentidget == studentobj.id )
      {
       
        const mybookstemparr = issuestate.map((issueobj) => {
   
       
          
          bookData.map((bookobj)=>{
            if(bookobj.bookid === issueobj.issuebookid){
              issueobj.bookid = bookobj.bookid
              issueobj.bookname = bookobj.title
              issueobj.bookauthor = bookobj.author
             
            }
          }
          )
          
         
          return issueobj
            
           
          })
          setTempMyBooks(mybookstemparr)
       
          
        
        
      }
    })

  },[studentdata,issuestate,bookData])

console.log(tempmybooks,"tt")

const countissued = tempmybooks?.filter(count => count.issuestudentid == studentidget && count.isissue == true).length
const countreturned = tempmybooks?.filter(count => count.issuestudentid == studentidget && count.isreturn == true).length
const countpending = tempmybooks?.filter(count => count.issuestudentid == studentidget && count.isreturn == false).length


const myBooksSearchFunc = (e) => {
  const value =  e.target.value;
  setMyBooksSearchState(value)
}

const issuedTabFunc = () => {
  setMybooksissued(true)
  setMybooksreturned(false)
  setMybookspending(false)

}
const pendingTabFunc = () => {
  setMybooksissued(false)
  setMybooksreturned(false)
  setMybookspending(true)
  
}
const returnedTabFunc = () => {
  setMybooksissued(false)
  setMybooksreturned(true)
  setMybookspending(false)
}

const sortNewest = () => {
  setSortMyBooks(1)
}
const sortOldest = () => {
  setSortMyBooks(2)
}

if(sortMyBooks == 1){
  

  function sortFunction(a,b){  
      var dateA = new Date(a.issuedate)
      var dateB = new Date(b.issuedate)
      return dateA < dateB ? 1 : -1;  
  }; 
  tempmybooks.sort(sortFunction);
}

if(sortMyBooks == 2){

  
  tempmybooks.sort(function(a, b) {
      var c = new Date(a.issuedate);
      var d = new Date(b.issuedate);
      return c-d;
  });
}



    return ( 
        
        <div className="container-student-page ">

        <p className="container-student-page-header pt-5">My Books</p>
        <hr />

<div className="search-sort-div  d-flex flex-wrap pb-3 ">
        <div className="search-main-icon col-md-6 col-11 d-flex justify-content-around align-items-center mt-2">
          <div className="mainsearch-div">
            <input
              className="inputsearch"
              type="text"
              onChange={myBooksSearchFunc}
              placeholder="Search by book title or author"
            
            />
          </div>
          <div>
            <AiOutlineSearch className="searchicon" />
          </div>
        </div>

        <div className="d-flex pt-3 gap-md-2">
        <p className="sort-para mt-2 m-0 ">Sort By :</p>
        <Dropdown className=" dropdown-mybooks d-inline  ">
        <Dropdown.Toggle id="dropdown-autoclose-true ">
         <span className="pe-5 ps-1">Newest</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={sortNewest}>Newest</Dropdown.Item>
          <Dropdown.Item onClick={sortOldest} href="#">Oldest</Dropdown.Item>
          
        </Dropdown.Menu>
      </Dropdown>
      </div>

 </div>

   <div className=" d-flex gap-md-5 mt-3  border-bottom ps-md-2">
     <div className="mybooks-filter pb-3" style={{borderBottom: mybooksissued ? "4px solid #0C39C7" : "none",}} onClick={issuedTabFunc}>Issued Books ({countissued})</div>
     <div className="mybooks-filter pb-3" style={{borderBottom:  mybookspending ? "4px solid #0C39C7" : "none",}} onClick={() =>{ pendingTabFunc()}}>Pending to return ({countpending})</div>
     <div className="mybooks-filter pb-3" style={{borderBottom: mybooksreturned ? "4px solid #0C39C7" : "none",}} onClick={returnedTabFunc}>Returned Books ({countreturned})</div>
  </div>




  
    <MyBooksListHeader studentidget = {studentidget}
       myBooksSearchState = {myBooksSearchState}
     tempmybooks = {tempmybooks}
     mybooksissued = {mybooksissued}
      mybooksreturned = {mybooksreturned}
      sortMyBooks = {sortMyBooks}/>

 

        </div>
     );
}
 
export default MyBooksContainer;