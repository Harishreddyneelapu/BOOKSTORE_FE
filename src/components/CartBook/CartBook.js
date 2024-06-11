import { useEffect, useState } from "react";
import { getCartDetailsApiCall } from "../../services/BookService";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
// import DeleteIcon from "@mui/icons-material/Delete";
import displayImg from '../../assets/bookimage.png'
import './CartBook.css'

function CartBook({ book, index }) {
    const [filteredBook, setFilteredBook] = useState({});
    useEffect(() => {
        const getAllBooksFromCart = async () => {
            let response = await getCartDetailsApiCall();
            setFilteredBook(response.data.data.books.filter((b) => b._id === book._id)[0]);
        };
        getAllBooksFromCart();
    }, [book]);
    // console.log(filteredBook);
    // console.log(book);
    return (
        <div className="cart-container">
            <div className="cart-book-card">
                <img src={displayImg} alt={`${book.bookName} Img`} className="cart-book-img" />
                <div className="cart-book-details">
                    <div className="cart-book-header">
                        <h1 className="cart-book-title">{book.bookName}</h1>
                    </div>
                    <p className="cart-book-author">by {book.author}</p>
                    <div className="cart-book-pricing">
                        <h1 className="cart-book-discount-price">Rs.{book.discountPrice}</h1>
                        <p className="cart-book-price">Rs.{book.price}</p>
                    </div>
                    <div className="cart-book-actions">
                        <div className="cart-book-quantity-controls">
                            <button className="cart-book-btn">
                                <RemoveCircleOutline />
                            </button>
                            <div className="cart-book-quantity">{book.quantity}</div>
                            <button className="cart-book-btn">
                                <AddCircleOutline />
                            </button>
                        </div>
                        <div className="cart-book-remove">
                            {/* <DeleteIcon /> */}
                            <span>Remove</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CartBook;