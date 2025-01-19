import MyBooksList from "./MyBooksList";

const MyBooksListHeader = ({tempmybooks,studentidget,myBooksSearchState, mybooksissued,mybooksreturned,sortMyBooks}) => {

  
    
    return ( 
        <div className="student-form-container container  text-center mt-5 pt-3 pb-5">
 <div className="student-form-field row py-3">
   <div className="col student-form-title">Book Title</div>
   <div className="col student-form-title">Author</div>
   <div className="col student-form-title">Issue Date</div>
   <div className="col student-form-title">Due Date</div>
   <div className="col student-form-title">Return Date</div>
   <div className="col student-form-title">Fine(Rs.10 per day)</div>
 </div>

 
{
  tempmybooks?.filter((data) => {
      if (myBooksSearchState === "") {
        return data;
      } else if (
        data.bookname.toLowerCase().includes(myBooksSearchState.toLowerCase())
      ) {
        return data;
      } else if (
        data.bookauthor.toLowerCase().includes(myBooksSearchState.toLowerCase())
      ) {
        return data;
      }
    })
    // .filter((fil)=> fil.isreturn !== false)
    //.filter((fil)=> fil.isreturn == false)
    .map((temp) => {
    if (temp.issuestudentid == studentidget && mybooksreturned == false && mybooksissued == true){
      return(
       <MyBooksList temp = {temp}/>
      )
    }
      else if(temp.issuestudentid == studentidget && mybooksreturned == true && temp.isreturn !== false ){
        return(
            <MyBooksList temp = {temp}/>
           )
      }
      else if(temp.issuestudentid == studentidget && mybooksreturned == false && temp.isreturn == false ){
        return(
            <MyBooksList temp = {temp}/>
           )
      }

      
    
    
    
      

})
  
}


 </div>

     );
}
 
export default MyBooksListHeader;