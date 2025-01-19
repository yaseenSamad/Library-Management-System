import SideBar from "../components/Sidebar";
import AllBooks from "../components/AllbooksContainer";

const AllMain = () => {
  return (
    <div className="AllMain-main d-flex gap-md-4 ">
      <div className="sidebar-div col-3 col-md-2 sticky-top">
        <SideBar student = {false}/>
      </div>

      <div className="col-9">
        <AllBooks />
      </div>
    </div>
  );
};

export default AllMain;
