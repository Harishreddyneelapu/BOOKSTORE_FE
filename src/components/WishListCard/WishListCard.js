import { DeleteOutline } from "@mui/icons-material";
import displayImg from '../../assets/bookimage.png';
import './WishListCard.css';
import { deleteWishListItem } from "../../utils/store/WishListSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeWishlistItem } from "../../services/BookService";

function WishListCard({ book }) {

    const dispatch = useDispatch()
    const WishListItems = useSelector((store) => store.wishList.wishListItems);
    
    const removeWishItem = async()=>{
        await removeWishlistItem(book._id)
        dispatch(deleteWishListItem(book?._id))
    }
    return (
        <div className="wishlistcard-container">
            <img src={displayImg} alt={`${book.bookName} Img`} className="wishlistcard-image" />
            <div className="wishlistcard-details">
                <div className="wishlistcard-header">
                    <h1 className="wishlistcard-title">{book.bookName}</h1>
                    <button className="wishlistcard-remove-button" onClick={removeWishItem}>
                        <DeleteOutline sx={{ height: "20px" }} />
                    </button>
                </div>
                <p className="wishlistcard-author">by {book.author}</p>
                <div className="wishlistcard-prices">
                    <h1 className="wishlistcard-discount-price">Rs.{book.discountPrice}</h1>
                    <p className="wishlistcard-original-price">Rs.{book.price}</p>
                </div>
            </div>
        </div>
    );
}

export default WishListCard;
