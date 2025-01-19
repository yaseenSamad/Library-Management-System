import { Fragment, useState } from "react";
import { useContext, useEffect } from "react";
import { allBooksContext } from "../App";
import "../css/studentprofile.css";

const ProfileList = ({ issueobj,profileSearch,finesubmit }) => {
  const [bookData, setBookData] = useContext(allBooksContext);

  const [profileDayDiff, setProfileDayDiff] = useState(null);
  

  var currentDueDate = new Date(issueobj?.duedate);
  var Duemonth = currentDueDate.getMonth() + 1;
  var Duedate = currentDueDate.getDate();
  var Dueyear = currentDueDate.getFullYear();
  const dueddatedisplay = Duedate + "-" + Duemonth + "-" + Dueyear;
  
  var currentreturndate = new Date(issueobj?.tempreturndate);
 
  var returnmonth = currentreturndate.getMonth()+1;
  var returndate = currentreturndate.getDate();
  var returnyear = currentreturndate.getFullYear();

  let finetotal = 0
  let finecal = 0
  let totalFineCalc = 0
  

  useEffect(() => {
    
  

    var date1 = new Date();
    var date2 = new Date(Duemonth + "-" + Duedate + "-" + Dueyear);
    var date3 = new Date(returnmonth + "-" + returndate + "-" + returnyear );
    
    if(issueobj.isreturn == false){
    if (date1 > date2) {
      var diffDays = parseInt((date1 - date2) / (1000 * 60 * 60 * 24), 10);
      setProfileDayDiff(diffDays);
      
      console.log(diffDays,"rrrfirst")
    //  totalFineCalc = totalFineCalc + diffDays ;
      // finetotal = finetotal + diffDays
      
      finesubmit(diffDays)
     
    console.log()
    }}else{
      if (date3 > date2) {
        var diffDays = parseInt((date3 - date2) / (1000 * 60 * 60 * 24), 10);
        setProfileDayDiff(diffDays);
        
        console.log(diffDays,"rrrsecond")
        // totalFineCalc = totalFineCalc + diffDays ;
        // finetotal = finetotal + diffDays
       
        finesubmit(diffDays)
        console.log()
      }
   

    }
  }, [issueobj]);


      
      // 


  return (
    <div key={issueobj.Issueid}>
      {
        bookData
        ?.filter((data) => {
          if (data === "") {
            return data;
          } else if (
            data.title.toLowerCase().includes(profileSearch.toLowerCase())
          ) {
            return data;
          } else if (
            data.author.toLowerCase().includes(profileSearch.toLowerCase())
          ) {
            return data;
          }
        })
        
        
        
        .map((bookobj) => {
         
        if (bookobj.bookid == issueobj.issuebookid) {
          return (
            <div className="Allbooks-row row py-3" >
            <Fragment key={bookobj.bookid}>
              <div className="col profile-table-data">{bookobj.title}</div>
              <div className="col profile-table-data">{bookobj.author}</div>
              <div className="col profile-table-data">{issueobj.issuedate}</div>
              <div className="col profile-table-data">{dueddatedisplay}</div>
              <div className="col profile-table-data">
                {!issueobj.isreturn ? "-" : issueobj.isreturndate}
              </div>
              <div className="col profile-table-data" style={{color : profileDayDiff ? "red" : "09174A" }}>
                {profileDayDiff ? profileDayDiff * 10 : "0"}
                
              </div>
            </Fragment>
            </div>
          );
        }
      })}

     
    </div>
  );
};

export default ProfileList;
