// import { useEffect, useState } from "react";
// import { getWishListDetailsApiCall } from "../../services/BookService";

// function WishList(){
//     const [wishListDetails, setWishListDetails] = useState([]);
//     useEffect(()=>{
//         const getWishListDetails = async ()=>{
//             const response = await getWishListDetailsApiCall();
//             setWishListDetails(response.data.data.books)
//         }
//         getWishListDetails();
//     },[])
// }
// export default WishList;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeartBroken } from "@mui/icons-material";
import WishListCard from "../WishListCard/WishListCard";
import { getWishListDetailsApiCall } from "../../services/BookService";
import './WishList.css';

function WishList() {
    const [wishListDetails, setWishListDetails] = useState([]);

    useEffect(() => {
        const getWishListDetails = async () => {
            const response = await getWishListDetailsApiCall();
            setWishListDetails(response.data.data.books);
        }
        getWishListDetails();
    }, []);

    return (
        <div className="wishlist-container">
            <div className="wishlist-content">
                <div className="wishlist-breadcrumb">
                    <Link to="/dashboard/allBooks" className="wishlist-link">
                        Home /
                    </Link>
                    <span> My Wishlist</span>
                </div>
                <div className="wishlist-list-container">
                    <div className="wishlist-header">
                        My Wishlist ({wishListDetails.length})
                    </div>
                    <div className="wishlist-items">
                        {wishListDetails.length ? (
                            wishListDetails.map((book, index) => (
                                <WishListCard key={index} book={book} />
                            ))
                        ) : (
                            <div className="wishlist-empty">
                                <HeartBroken className="wishlist-empty-icon" />
                                <h1>Your Wishlist is Empty!</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WishList;
