import { getAllBooksApiCall } from "../../services/BookService";
import React, { useState, useEffect } from 'react';
import Book from "../Book/Book";
import { MenuItem, Select } from "@mui/material";
import './AllBooks.css'; 

function AllBooks() {
    const [BookList, setBookList] = useState([]);
    const [sortOption, setSortOption] = useState("");

    useEffect(() => {
        const getAllBooks = async () => {
            let response = await getAllBooksApiCall();
            setBookList(response.data.data);
        };
        getAllBooks();
    }, []);
  
    return (
        <>
            {BookList.length ? (
                <div>
                    <div className="header-books">
                        <p>
                            <span className="header-title-book">Books</span>
                            <span className="header-count">({BookList.length} Items)</span>
                        </p>
                        <Select
                            labelId="sort-select-label"
                            id="sort-select"
                            size="small"
                            defaultValue="Sort by relevance"
                            onChange={(e) => setSortOption(e.target.value)}
                            className="sort-select"
                        >
                            <MenuItem value={"Sort by relevance"}>Sort by relevance</MenuItem>
                            <MenuItem value={"LowToHigh"}>Price: Low to High</MenuItem>
                            <MenuItem value={"HighToLow"}>Price: High to Low</MenuItem>
                            <MenuItem value={"newArrivals"}>Newest Arrivals</MenuItem>
                        </Select>
                    </div>

                    <div className="book-grid">
                        {BookList.map((book, index) => (
                            <Book key={index} index={index} book={book} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="no-books">
                    No Books Are Available
                </div>
            )}
        </>
    );
}

export default AllBooks;
