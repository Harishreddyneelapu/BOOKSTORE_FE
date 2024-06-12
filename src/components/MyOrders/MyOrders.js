import { useEffect, useState } from "react";
import { getOrderDetailsApiCall } from "../../services/BookService";
import { Link } from "react-router-dom";
import emptyCart from '../../assets/empty_cart.png';
import displayImg from '../../assets/bookimage.png';
import './MyOrders.css';

function MyOrders() {
    const [orderDetails, setOrderDetails] = useState({ books: [], orderPlacedDate: '' });

    useEffect(() => {
        const getAllOrders = async () => {
            const response = await getOrderDetailsApiCall();
            setOrderDetails(response.data.data);
        };
        getAllOrders();
    }, []);

    const formatOrderDate = (dateString) => {
        const date = new Date(dateString);
        const options = { month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div className="myorder-container">
            <div className="myorder-content">
                <div className="myorder-breadcrumb">
                    <Link to="/dashboard/allBooks" className="myorder-link">
                        Home /
                    </Link>
                    <span> My Orders</span>
                </div>
                <div className="myorder-list">
                    {orderDetails.books.length ? (
                        orderDetails.books.map((book) => (
                            <div key={book._id} className="myorder-item">
                                <div className="myorder-item-content">
                                    <img src={displayImg} alt={`${book.bookName} Img`} className="myorder-item-image" />
                                    <div className="myorder-item-details">
                                        <h1 className="myorder-item-title">{book.bookName}</h1>
                                        <p className="myorder-item-author">by {book.author}</p>
                                        <div className="myorder-item-prices">
                                            <h1 className="myorder-item-discount-price">Rs.{book.discountPrice}</h1>
                                            <p className="myorder-item-original-price">Rs.{book.price}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="myorder-item-status">
                                    <li className="myorder-item-status-icon" />
                                    Order Placed on {formatOrderDate(orderDetails.orderPlacedDate)}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="myorder-empty">
                            <img src={emptyCart} alt="emptyCart" className="myorder-empty-image" />
                            <h1 className="myorder-empty-message">You have not Ordered Anything!</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyOrders;
