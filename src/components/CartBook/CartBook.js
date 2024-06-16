import { useState } from "react";
import { removeCartList, updateCartList } from "../../services/BookService";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import displayImg from '../../assets/bookimage.png'
import './CartBook.css'
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "../../utils/store/CartSlice";

function CartBook({ book, index }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((store) => store.cart.cartItems);
    const [quantityToBuy, setQuantityToBuy] = useState(1);
    const cartBook = cartItems.filter((cartbook) => cartbook._id === book._id)[0]

    const token = localStorage.getItem("accessToken")

    const removeItem = async () => {
        const res = await removeCartList(book._id);
        console.log(res);
        dispatch(deleteCartItem(book._id));
    };

    const decrementQuantity = async () => {
        // const updateCart = await updateCartList(cartBook._id, quantityToBuy - 1)
        // console.log(updateCart);
        dispatch(updateCartQuantity({ ...cartBook, quantityToBuy: quantityToBuy - 1 }))

        setQuantityToBuy(quantityToBuy - 1)
    };

    const IncrementQuantity = async () => {
        // const updateCart = await updateCartList(cartBook._id, quantityToBuy + 1)
        // console.log(updateCart);
        dispatch(updateCartQuantity({ ...cartBook, quantityToBuy: quantityToBuy + 1 }))

        setQuantityToBuy(quantityToBuy + 1)
    };
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
                            <button className="cart-book-btn" onClick={decrementQuantity} disabled={book.quantityToBuy === 1}>
                                <RemoveCircleOutline />
                            </button>
                            <div className="cart-book-quantity">{book.quantityToBuy}</div>
                            <button className="cart-book-btn" onClick={IncrementQuantity} disabled={book.quantityToBuy < book.quantity ? false : true}>
                                <AddCircleOutline />
                            </button>

                            {token ? (<button className="cart-book-btn" onClick={IncrementQuantity} disabled={book.quantityToBuy < book.quantity ? false : true}>
                                <AddCircleOutline />
                            </button>) : (<button className="cart-book-btn" onClick={IncrementQuantity} disabled={book.quantityToBuy < book.quantity ? false : true}>
                                <AddCircleOutline />
                            </button>)}
                        </div>
                        <div className="cart-book-remove">
                            <span onClick={removeItem}>Remove</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CartBook;