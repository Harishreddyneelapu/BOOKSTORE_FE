import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./Book.css";
import BookImage from "../../assets/bookimage.png";
import Star from "@mui/icons-material/StarBorderPurple500Sharp";

function Book({ book, bookView }) {
  return (
    <Card className="mainContainer-card">
      <CardContent className="contentClass">
        <Box className="BookBox">
          <img
            src={BookImage}
            alt="Book not found"
            className="book-image"
            onClick={() => bookView(book)}
          />
        </Box>
        <Box className="book-name-class bookNameClass">{book.bookName}</Box>
        <Box className="book-name-class book-author-class">{book.author}</Box>
        <Box className="book-name-class book ratingBox">
          <Box className="greenBox">
            4.5<Star fontSize="1rem" className="star-symbol" />
          </Box>
          <span className="ratingCount">(20)</span>
        </Box>
        <Box className="book-name-class priceBox">
          <span>Rs. {book.discountPrice} </span>
          <span className="priceBox1">Rs. {book.price}</span>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Book;
