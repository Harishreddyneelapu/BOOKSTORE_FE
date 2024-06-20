import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartBook from "../CartBook/CartBook";
import { Accordion, AccordionDetails, AccordionSummary, Button, Modal, Box } from "@mui/material";
import AddressCard from "../AddressCard/AddressCard";
import OrderDetails from "../OrderDetails/OrderDetails";
import './BookStoreCart.css';
import { getCartDetailsApiCall } from "../../services/BookService";
import { useDispatch, useSelector } from "react-redux";
import LoginOrSignUp from "../LoginOrSignUp/LoginOrSignUp";

function BookStoreCart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((store) => store.cart.cartItems);
    console.log(cartItems);
    const [expanded, setExpanded] = useState(false);
    const [expanded2, setExpanded2] = useState(false);
    const [profile, setProfile] = useState(false);

    const placeOrder = () => {
        if (sessionStorage.getItem("accessToken")) {
            setExpanded(true);
        } else {
            setProfile(true);
        }
    };
    
    const toOrdersSummary = () => {
        navigate('/dashboard/orderSuccess');
    }

    const orderAddress = () => {
        setExpanded2(true);
    };

    return (
        <div className="cart-container">
            <div className="cart-content">
                <div className="cart-breadcrumb">
                    <Link to="/dashboard/allBooks" className="cart-home-link">Home /</Link>
                    <span> My Cart</span>
                </div>
                <div className="cart-box">
                    <div className="cart-header">My cart ({cartItems.length})</div>
                    <div className="cart-items">
                        <div className="cart-items-cartBook">
                            {cartItems.length ? (
                                cartItems.map((book, index) => (
                                    <CartBook key={index} book={book} index={index} />
                                ))
                            ) : (
                                <center><h1 className="cart-empty">Your Cart is Empty! Add any Book to Cart!</h1></center>
                            )}
                        </div>

                        <div className={cartItems.length && !expanded ? "cart-place-order" : "hidden"}>
                            <Button variant="contained" className="cart-place-order-button" onClick={placeOrder}>
                                Place order
                            </Button>
                        </div>
                    </div>
                </div>
                <Accordion expanded={expanded} className="cart-accordion">
                    <AccordionSummary className="cart-accordion-summary" >
                        Customer Details
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
                            <div className="cart-customer-details">
                                <div className="cart-detail">
                                    <label>Full Name</label>
                                    <span className="cart-input">Harish Reddy</span>
                                </div>
                                <div className="cart-detail">
                                    <label>Mobile Number</label>
                                    <span className="cart-input">23456789</span>
                                </div>
                            </div>
                            <AddressCard />
                            <div className={!expanded2 ? "cart-continue" : "hidden"}>
                                <Button variant="contained" className="cart-continue-button" onClick={orderAddress}>
                                    Continue
                                </Button>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded2} className="cart-accordion">
                    <AccordionSummary className="cart-accordion-summary">
                        Order Summary
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
                            <div className="order-summary-cnt">
                                {cartItems.length ? (
                                    cartItems.map((book, index) => (
                                        <OrderDetails key={index} index={-1} book={book} />
                                    ))
                                ) : (
                                    <center><h1 className="cart-empty">Your Cart is Empty! Add any Book to Cart!</h1></center>
                                )}
                            </div>
                            <div className="cart-checkout">
                                <Button variant="contained" className="cart-checkout-button" onClick={toOrdersSummary}>
                                    Checkout
                                </Button>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
            <Modal open={profile} onClose={() => setProfile(false)}>
                <Box>
                    <LoginOrSignUp profile={profile} setProfile={setProfile} />
                </Box>
            </Modal>
        </div>
    );
}

export default BookStoreCart;
