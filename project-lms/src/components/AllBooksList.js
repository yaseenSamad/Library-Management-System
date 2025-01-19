import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useContext, useState } from "react";
import { allBooksContext } from "../App";
import DeleteModalAllbooks from "../Modals/DeleteModalAllbook";
import AddBookModal from "../Modals/AddBookModal";

const AllBooksList = ({
  Allbookssearchdata,
  selectedAllbooks,
  setSelectedAllbooks,
  ModalShowAddBook,
}) => {
  const [bookData, setBookData] = useContext(allBooksContext);
  const [allbookkeyelement, setAllbookkeyelement] = useState(""); //delete id taking state

  const [showbookDelete, setShowbookDelete] = useState(false);


  const AllbookEditFunc = (selected) => {
    setSelectedAllbooks(selected);
    
  };

 

  const handleShowDeleteBook = () => setShowbookDelete(true);

  const allBookGetkey = (deletebook) => {
    setAllbookkeyelement(deletebook);
   
  };

  return (
    <div>
      <AddBookModal selectedAllbooks={selectedAllbooks} />

      <DeleteModalAllbooks
        showbookDelete={showbookDelete}
        setShowbookDelete={setShowbookDelete}
        allbookkeyelement={allbookkeyelement}
        selectedAllbooks={selectedAllbooks}
      />

      {bookData
        ?.filter((data) => {
          if (data === "") {
            return data;
          } else if (
            data.title.toLowerCase().includes(Allbookssearchdata.toLowerCase())
          ) {
            return data;
          } else if (
            data.author.toLowerCase().includes(Allbookssearchdata.toLowerCase())
          ) {
            return data;
          }
        })
        .map((item) => (
          <div className="Allbooks-row row py-2" key={item.bookid}>
            {console.log(item)}
            <div className="col Allbooks-content flex-wrap">{item.title}</div>
            <div className="col Allbooks-content flex-wrap">{item.author}</div>
            <div className="col Allbooks-content">{item.language}</div>
            <div className="col Allbooks-content">{item.totalcopies}</div>
            <div className="col Allbooks-content">{item.remaining}</div>
            <div className="col Allbooks-content ">
              <MdModeEditOutline
                className="Allbooks-edit me-md-2"
                onClick={() => {
                  ModalShowAddBook();
                  AllbookEditFunc(item);
                }}
              />

              <RiDeleteBin6Line
                className="Allbooks-delete"
                onClick={() => {
                  handleShowDeleteBook();
                  allBookGetkey(item.bookid);
                }}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default AllBooksList;
