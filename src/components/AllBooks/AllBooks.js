import { getAllBooksApiCall } from "../../services/BookService";
// import Book from "../Book/Book";

import React, { useEffect, useState } from "react";
import "./AllBooks.css";
import Book from "../Book/Book";


const Allbooks = ({ bookView, searchInput, showSearch }) => {
  const [getBooks, setGetBooks] = useState([]);
  const getAllBooks = async () => {
    let response = await getAllBooksApiCall();
    setGetBooks(response.data.data);
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  const searchedBook = getBooks.filter((search) =>
    search.bookName.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="display-all-books">
      {!showSearch &&
        getBooks.map((book) => (
          <Book key={book._id} book={book} bookView={bookView} />
        ))}
      {showSearch &&
        searchedBook.length !== 0 &&
        searchedBook.map((book) => <Book key={book._id} book={book} bookView={bookView} />)}
    </div>
  );
};

export default Allbooks;
