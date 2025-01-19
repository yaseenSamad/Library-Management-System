import ReactTooltip from "react-tooltip";
import { MdOutlineAssignmentReturn } from "react-icons/md";
import { Fragment, useContext, useEffect, useState } from "react";
import { allBooksContext, studentContext } from "../App";


const IssueBookList = ({ issueobj, returnGetkey, handleReturnShow,issueSearchText }) => {
  const [studentdata, setStudentdata] = useContext(studentContext);
  const [bookData, setBookData] = useContext(allBooksContext);
  const [dayDiff, setDayDiff] = useState();
  const [issuesearchState,setIssueSearchState] = useState('')
  const [issueSearchStudent,setIssueSearchStudent] = useState('')
 

 

  var currentIssueDate = new Date(issueobj?.issuedate);
  var Issuemonth = currentIssueDate.getMonth() + 1;
  var Issuedate = currentIssueDate.getDate();
  var Issueyear = currentIssueDate.getFullYear();
  const issueddatedisplay = Issuedate + "-" + Issuemonth + "-" + Issueyear;
  // const issueddate = issueobj.issuedate.getDate()+"-"+ issueobj.issuedate.getMonth()+1 + "-" + issueobj.issuedate.getFullYear()
 

  var currentDueDate = new Date(issueobj?.duedate);
  var Duemonth = currentDueDate.getMonth() + 1;
  var Duedate = currentDueDate.getDate();
  var Dueyear = currentDueDate.getFullYear();
  const dueddatedisplay = Duedate + "-" + Duemonth + "-" + Dueyear;
 

  useEffect(() => {
    var date1 = new Date();
    var date2 = new Date(Duemonth + "-" + Duedate + "-" + Dueyear);

    if (date1 > date2) {
      var diffDays = parseInt((date1 - date2) / (1000 * 60 * 60 * 24), 10);
      setDayDiff(diffDays);
     
    }
  }, [issueobj]);


  useEffect(()=>{
  
   let filterdata =  bookData ?.filter((data) => {
      if (data === "") {
        return data;
      } else if (
        data.title.toLowerCase().includes(issueSearchText.toLowerCase())
      ) {
        // setIssueSearchState(true)
        return data;
         
      }
    })

    
    setIssueSearchState(filterdata)

    let filterstudentdata = studentdata?.filter((studentdata) => {
      if (studentdata === "") {
        return studentdata;
      }
      
      else if (
        studentdata.name.toLowerCase().includes(issueSearchText.toLowerCase())
      ) {
        return studentdata;
      }
    })

    setIssueSearchStudent(filterstudentdata)

  },[issueSearchText,bookData,studentdata])

 


  return (
    <Fragment>
    
      <div className="issue-book-list-container " key={issueobj.Issueid}>
    
        {
          
         bookData?.filter((data) => {
          if (data === "") {
            return data;
          }
          else if(
            issueSearchStudent.length > 0   
          ){
            return data
          } else if (
            data.title.toLowerCase().includes(issueSearchText.toLowerCase())
          ) {
            // setIssueSearchState(true)
            return data;
          }
        })
         
         
         
         .map((bookobj) => {
         
          return <Fragment>
          
           {
            (issueobj.issuebookid === bookobj.bookid)&& 
           <Fragment>
           
            {studentdata?.filter((studentdata) => {
              if (studentdata === "") {
                return studentdata;
              }else if(
                issuesearchState.length > 0   
              ){
                return studentdata
              }
              
              else if (
                studentdata.name.toLowerCase().includes(issueSearchText.toLowerCase())
              ) {
                return studentdata;
              }
            })  
            .map((studentobj) => {
              
              if (issueobj.issuestudentid == studentobj.id) {
              
                return (
                  <Fragment>
                  <div className="Issuepage-row row py-2">
                  <div className="col Issuepage-content">{bookobj.title}</div>
                  <div className="col Issuepage-content">{studentobj.name}</div>
    
                  
            <div className="col Issuepage-content">{issueddatedisplay}</div>
    
            <div className="col Issuepage-content">{dueddatedisplay}</div>
    
            <div className="col Issuepage-content" style={{color : dayDiff ? "red" : "" }}>
              {dayDiff ? dayDiff * 10 : "0"}
            </div>
    
            <div className="col Issuepage-content">
              <button
                className="returnbutton"
                data-tip
                data-for="returntooltip"
                onClick={() => {
                  handleReturnShow();
                  returnGetkey(issueobj.Issueid);
                }}
              >
                <MdOutlineAssignmentReturn className="Issuepage-return" />
              </button>
              <ReactTooltip id="returntooltip" place="top" effect="solid">
                Mark as returned
              </ReactTooltip>
            </div>
            </div>
              </Fragment>
                );
              }
            })}
           </Fragment>
           }
          </Fragment>
         
        })}

      

      </div>
      
     
    </Fragment>
  );
};

export default IssueBookList;
