import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import BookImage from '../../assets/bookimage.png'

import './Book.css';

function Book({ book }) {
    

    return (
        <Link to={`/dashboard/bookView/${book._id}`} className="book-card-link-card">
            <div className="book-card-card">
                <div className="book-image-container-card">
                    <img src={BookImage} className="book-image-card" alt={book.bookName} />
                </div>
                <div className="book-info-card">
                    <span style={{color:'black'}} className="book-name-card">{book.bookName}</span>
                    <span className="book-author-card">{book.author}</span>
                    <div className="book-rating-card">
                        <div className="rating-box-card">
                            <span className="rating-value-card">4.5</span>
                            <StarIcon className="rating-icon-card-gsi" style={{height : "14px" , color : "white"}} />
                        </div>
                        <span className="book-quantity-card">({book.quantity})</span>
                    </div>
                    <div className="book-pricing-card">
                        <span className="discount-price-card">Rs. {book.discountPrice}</span>
                        <span className="original-price-card">Rs. {book.price}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Book;

