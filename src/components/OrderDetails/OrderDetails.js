// import { useEffect, useState } from "react";
// import { getOrderDetailsApiCall } from "../../services/BookService";

// function OrderDetails(){
//     const [orderDetailBooks, setOrderDetailBooks] = useState([]);

//     useEffect(()=>{
//         let getAllOrderBooks = async ()=>{
//             const response = await getOrderDetailsApiCall();
//             setOrderDetailBooks(response.data.data.books);
//         }
//         getAllOrderBooks();
//     }, []);
//     return 
// }

// export default OrderDetails;

import React, { useEffect, useState } from 'react';
import displayImg from '../../assets/bookimage.png';
import './OrderDetails.css';
import { getOrderDetailsApiCall } from '../../services/BookService';

const OrderDetails = () => {
    const [orderDetailBooks, setOrderDetailBooks] = useState([]);

    useEffect(() => {
        const getAllOrderBooks = async () => {
            const response = await getOrderDetailsApiCall();
            setOrderDetailBooks(response.data.data.books);
        }
        getAllOrderBooks();
    }, []);

    return (
        <div>
            {orderDetailBooks.map((book, index) => (
                <div key={index} className="order-container">
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
            ))}
        </div>
    );
};

export default OrderDetails;
