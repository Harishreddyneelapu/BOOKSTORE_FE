import React from "react";
import "./Header.css";
import educationlogo from "../../assets/bookLogo.png";
import SearchIcon from "@mui/icons-material/Search";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

function Header() {
  let navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-left">
        <img src={educationlogo} alt="logo" className="header-logo" />
        <span className="header-title">Bookstore</span>
      </div>
      <div className="header-center">
        <div className="search-container">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            className="header-search-input"
          />
        </div>
      </div>
      <div className="header-right">
        <div className="header-icon" onClick={() => navigate("/profile")}>
          <Person2OutlinedIcon />
          <span>Profile</span>
        </div>
        {/* <div className="header-icon" onClick={() => navigate("/wishlist")}>
          <FavoriteIcon />
          <span>Wishlist</span>
        </div> */}
        <div className="header-icon" onClick={() => navigate("/cart")}>
          <AddShoppingCartOutlinedIcon />
          <span>Cart</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
