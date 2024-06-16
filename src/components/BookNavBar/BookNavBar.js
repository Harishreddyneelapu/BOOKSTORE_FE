import educationIcon from '../../assets/bookLogo.png';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch } from 'react-redux';
// import { addItemToBooks } from '../utils/store/BookSlice';
import { getAllBooksApiCall, getCartDetailsApiCall, getWishListDetailsApiCall } from '../../services/BookService';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import { Avatar, Button, ListItemIcon, Menu, MenuItem } from '@mui/material';
// import Logo from '../assets/shoppingCart.png';
// import { createUser, loginUser } from '../utils/UserService';
import { MarkunreadMailboxOutlined, FavoriteBorder } from '@mui/icons-material';
import React from 'react';
import { putCartItem } from '../../utils/store/CartSlice';
import { putWishList } from '../../utils/store/WishListSlice';
import LoginOrSignUp from '../LoginOrSignUp/LoginOrSignUp';
import './BookNavBar.css';

function BookNavBar() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accessToken, setAccessToken] = useState(false);
  const [name, setName] = useState("");

  const myName = localStorage.getItem("myName");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  const getAccessToken = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(true);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setProfile(true);
    localStorage.removeItem("accessToken");
  };

  const navigateToCart = () => {
    navigate("/dashboard/bookCart");
  };

  const navigateToBooks = () => {
    navigate("/dashboard/");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    fetchBookList();
  }, []);

  const getCartDetails = async () => {
    const response = await getCartDetailsApiCall();
    if (response.length) {
      setProfile(false);
      setName(response[0].user_id.fullName);
      localStorage.setItem("myName", response[0].user_id.fullName);
    }
    const bookList = response.map((cartBook) => ({
      ...cartBook,
      bookName: cartBook.product_id.bookName,
      author: cartBook.product_id.author,
      price: cartBook.product_id.price,
      discountPrice: cartBook.product_id.discountPrice,
      _id: cartBook.product_id._id,
      cartId: cartBook._id,
      quantityToBuy: cartBook.quantityToBuy,
      user_id: cartBook.user_id,
      quantity: cartBook.product_id.quantity
    }));
    dispatch(putCartItem(bookList));
  };

  const wishListDetails = async () => {
    const response = await getWishListDetailsApiCall();
    dispatch(putWishList(response));
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      getCartDetails();
      wishListDetails();
      setProfile(false);
    }
  }, []);

  const fetchBookList = async () => {
    try {
      const res = await getAllBooksApiCall();
      //   if (res) {
      //     dispatch(addItemToBooks(res));
      //   }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="nav-bar">
        <div className="logo-container" onClick={navigateToBooks}>
          <img src={educationIcon} alt="" className="logo" />
          <span className="logo-text">Bookstore</span>
        </div>
        <div className="search-bar">
          <SearchIcon className="search-icon" />
          <input type="text" className="search-input" placeholder="Search" />
        </div>
        <div className="profile-cart-container">
          {accessToken ? (
            <div className="profile-logged-in" onClick={handleClick}>
              <PersonOutlineIcon className="profile-icon" />
              <div className="profile-name">{name}</div>
            </div>
          ) : (
            <div className="profile-logged-out" onClick={handleClick}>
              <PersonOutlineIcon className="profile-icon" />
              <span className="profile-text">Profile</span>
            </div>
          )}
          <div className="cart-container" onClick={navigateToCart}>
            <ShoppingCartIcon className="cart-icon" />
            <span className="cart-text">Cart</span>
          </div>
        </div>

        {accessToken ? (
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem style={{ backgroundColor: "white", fontWeight: "600" }}>
              Hello {name},
            </MenuItem>
            <Link to={"/dashboard/profile"}>
              <MenuItem onClick={handleClose}>
                <Avatar /> Profile
              </MenuItem>
            </Link>
            <Link to={"/dashboard/allOrders"}>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <MarkunreadMailboxOutlined fontSize="small" />
                </ListItemIcon>
                My Orders
              </MenuItem>
            </Link>
            <Link to={"/dashboard/wishList"}>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <FavoriteBorder fontSize="small" />
                </ListItemIcon>
                Wishlist
              </MenuItem>
            </Link>
            <MenuItem onClick={handleClose}>
              <Button
                variant="outlined"
                sx={{
                  width: "150px",
                  height: "40px",
                  borderColor: "#A03037",
                  color: "#A03037",
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </MenuItem>
          </Menu>
        ) : (
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem style={{ fontWeight: "600", backgroundColor: "white" }}>
              Welcome
            </MenuItem>
            <MenuItem style={{ color: "#878787" }}>
              to access account and manage orders
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Button
                variant="outlined"
                sx={{
                  width: "140px",
                  height: "40px",
                  borderColor: "#A03037",
                  color: "#A03037",
                  borderRadius: "3px",
                }}
                onClick={() => setProfile(true)}
              >
                Login/SignUp
              </Button>
            </MenuItem>
            <MenuItem>
              <span
                className="menu-divider"
              ></span>
            </MenuItem>
            <Link to={"/dashboard/allOrders"}>
              <MenuItem style={{ color: "#878787" }}>
                My Orders
              </MenuItem>
            </Link>
            <Link to={"/dashboard/wishList"}>
              <MenuItem style={{ color: "#878787" }}>
                WishList
              </MenuItem>
            </Link>
          </Menu>
        )}

        <Modal
          open={profile}
          onClose={() => setProfile(false)}
        >
          <LoginOrSignUp profile={profile} setProfile={setProfile} />
        </Modal>
      </div>
    </>
  );
}

export default BookNavBar;
