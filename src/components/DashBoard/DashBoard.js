import React, { useState } from "react";
import Header from "../Header/Header";
import "./DashBoard.css";
import Allbooks from "../AllBooks/AllBooks";
import Bookview from "../BookView/BookView";
import Footer from "../Footer/Footer";

function Dashboard() {
  const [viewBook, setViewBook] = useState(false);
  const [selectedBook, setSelectedBook] = useState("hello");

  const bookView = (book) => {
    setSelectedBook(book);
    setViewBook(true);
  };
  const [searchInput, setSearchInput] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  if (viewBook) {
    return <Bookview book={selectedBook} />;
  }
  return (
    <>
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setShowSearch={setShowSearch}
      />
      
      <div className="mainContainer">
        <div className="change-display change-display-left">
          <span className="BooksText">Books </span>
          <span className="book-count">(128 items)</span>
        </div>
        <div className="change-display change-display-right">
          <select className="sort-by">
            <option value="volvo">Sort by relevance</option>
          </select>
        </div>
      </div>
      <Allbooks
        bookView={bookView}
        searchInput={searchInput}
        showSearch={showSearch}
      />
      <Footer />
    </>
  );
}

export default Dashboard;
