import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeartBroken } from "@mui/icons-material";
import WishListCard from "../WishListCard/WishListCard";
// import { getWishListDetailsApiCall } from "../../services/BookService";
import './WishList.css';
import { useSelector } from "react-redux";

function WishList() {


    const wishListItems = useSelector((store) => store.wishList.wishListItems);

    useEffect(() => {

    }, [wishListItems])

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
                        My Wishlist ({wishListItems.length})
                    </div>
                    <div className="wishlist-items">
                        {wishListItems.length ? (
                            wishListItems.map((book, index) => (
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
