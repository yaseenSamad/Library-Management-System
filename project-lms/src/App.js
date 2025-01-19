import React, { useEffect } from "react";
import { createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import StudentProfile from "./pages/StudentProfile";
import Login from "./pages/LoginLayout";

import Student from "./pages/StudentsLayout";

import AllMain from "./pages/AllbooksLayout";
import IssueMain from "./pages/IssuePageLayout";
import MyBooks from "./pages/MyBooks";
import StudentAllBooks from "./pages/StudentAllBooks";

export const studentContext = createContext();
export const allBooksContext = createContext();
export const issuebooksContext = createContext();
export const sidebarCustomizeContext = createContext();

// const localStorageAdmin = () => {
//   let admindetail = localStorage.getItem('admindetails')
//   console.log(admindetail,"yyyy")
// }

const localStorageStudent = () => {
  let Studentarr = localStorage.getItem("studentdata");
  console.log(Studentarr);

  if (Studentarr) {
    return JSON.parse(localStorage.getItem("studentdata"));
  } else {
    return [];
  }
};

const localStorageAllBooks = () => {
  let Allbooksarr = localStorage.getItem("bookData");
  console.log(Allbooksarr);

  if (Allbooksarr) {
    return JSON.parse(localStorage.getItem("bookData"));
  } else {
    return [];
  }
};

const localStorageIssueBooks = () => {
  let Issuebooksarr = localStorage.getItem("issuestate");
  console.log(Issuebooksarr);

  if (Issuebooksarr) {
    return JSON.parse(localStorage.getItem("issuestate"));
  } else {
    return [];
  }
};



function App() {

  const StudentLoginId = () => {
   return sessionStorage.getItem("studentloginid");
  }

  


  const [formSubmitted, setFormSubmitted] = useState(false);
  const [studentdata, setStudentdata] = useState(localStorageStudent());
  const [bookData, setBookData] = useState(localStorageAllBooks());
  const [issuestate, setIssuestate] = useState(localStorageIssueBooks());
  const [studentidget,setStudentIdGet] = useState(StudentLoginId())

  
  useEffect(() => {
    
    sessionStorage.setItem("studentloginid",studentidget);
    
  }, [studentidget])



  useEffect(() => {
    // localStorage.setItem("Admin",JSON.stringify(admindetails))
    localStorage.setItem("studentdata", JSON.stringify(studentdata));
    localStorage.setItem("bookData", JSON.stringify(bookData));
    localStorage.setItem("issuestate", JSON.stringify(issuestate));
    
  }, [studentdata, bookData, issuestate]);

  const submitForm = () => {
    setFormSubmitted(true);
  };

  const admindetails = {
    email: "yasin@2003",
    password: "12345",
  };


  return (
   
    <issuebooksContext.Provider value={[issuestate, setIssuestate]}>
      <allBooksContext.Provider value={[bookData, setBookData]}>
        <studentContext.Provider value={[studentdata, setStudentdata]}>
          <div className="App ">
            <Router>
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    !formSubmitted ? (
                      <Login
                        submitForm={submitForm}
                        admindetails={admindetails}
                        setStudentIdGet = {setStudentIdGet}
                        studentidget = {studentidget}
                      />
                    ) : (
                      <IssueMain />
                    )
                  }
                />

               

                <Route path="/issued-books" element={<IssueMain />} />
                <Route path="/all-books" element={<AllMain />} />
                <Route path="/students" element={<Student />} />
                <Route path="/students/:id" element={<StudentProfile />} />
                <Route path="/mybooks" element = {<MyBooks studentidget = {studentidget} student = {true} />}/>
                <Route path="/student-allbooks" element = {<StudentAllBooks/>}/>
                
              </Routes>
            </Router>
          </div>
        </studentContext.Provider>
      </allBooksContext.Provider>
    </issuebooksContext.Provider>
 
  );
}

export default App;
