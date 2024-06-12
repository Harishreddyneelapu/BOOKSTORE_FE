import { DeleteOutline } from "@mui/icons-material";
import displayImg from '../../assets/bookimage.png';
import './WishListCard.css';

function WishListCard({ book }) {
    return (
        <div className="wishlistcard-container">
            <img src={displayImg} alt={`${book.bookName} Img`} className="wishlistcard-image" />
            <div className="wishlistcard-details">
                <div className="wishlistcard-header">
                    <h1 className="wishlistcard-title">{book.bookName}</h1>
                    <button className="wishlistcard-remove-button">
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
