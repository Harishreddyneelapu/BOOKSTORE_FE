import React from 'react';
import displayImg from '../../assets/bookimage.png';
import './OrderDetails.css';

const OrderDetails = ({ book, index }) => {
    return (
        <div className="order-container">
            <img src={displayImg} alt={`${book.bookName} Img`} className="order-image" />
            <div className="order-details">
                <div className="order-title">
                    <h1 className="order-book-name">{book.bookName}</h1>
                </div>
                <p className="order-author">by {book.author}</p>
                <div className="order-pricing">
                    <h1 className="order-discount-price">Rs.{book.discountPrice}</h1>
                    <p className="order-original-price">Rs.{book.price}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
