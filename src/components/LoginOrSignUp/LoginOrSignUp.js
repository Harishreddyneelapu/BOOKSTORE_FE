import { Box, Button, IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Logo from '../../assets/shoppingCart.png';
import React from "react";
import './LoginOrSignUp.css';
import { useDispatch, useSelector } from "react-redux";
import { loginApiCall, signUpApiCall } from "../../services/UserService";
import { addCartList, addWishList, getCartDetailsApiCall, getWishListDetailsApiCall, updateCartList } from "../../services/BookService";
import { Link, useNavigate } from "react-router-dom";
import { addItemToCart, updateCartQuantity } from "../../utils/store/CartSlice";
import { addItemToWishList } from "../../utils/store/WishListSlice";

const LoginOrSignUp = ({ profile, setProfile }) => {
    const [sign, setSign] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const [emailValidator, setEmailValidator] = useState(false);
    const [passwordValidator, setPasswordValidator] = useState(false);
    const cartList = useSelector((store) => store.cart.cartItems)
    const wishListList = useSelector((store)=> store.wishList.wishListItems)

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleSign = (action) => {
        setSign(action === "signUp");
    };

    const newUser = async () => {
        const fullname = (document.getElementById('signUpfullname')).value
        console.log(fullname);
        const emailId = (document.getElementById('signUpemailId')).value
        console.log(emailId);
        const password = (document.getElementById('signUppassword')).value
        console.log(password);
        const confirmPassword = (document.getElementById('signUpConfirmpassword')).value
        console.log(confirmPassword);

        const userObj = {
            firstName: fullname,
            email: emailId,
            password: password,
            confirmPassword: confirmPassword
        }
        console.log(userObj);
        try {
            const res = await signUpApiCall(userObj);
            console.log(res);

        } catch (error) {
            console.error("Error creating user:", error)
        }
    }

    const handleLogin = async () => {
        const emailRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        setEmailValidator(!emailRegex.test(email));
        setPasswordValidator(password.length < 6);

        if (!emailValidator && !passwordValidator) {
            const loginObj = {
                email: email,
                password: password
            }
            const res = await loginApiCall(loginObj);
            sessionStorage.setItem("accessToken", res.data.data.token);

            const fetchCartList = await getCartDetailsApiCall(res.data.data.token);
            console.log(fetchCartList);
            const fetchWishList = await getWishListDetailsApiCall(res.data.data.token);
            console.log(fetchWishList);
            

            if(cartList.length ===0 && fetchCartList.length!==0){
                for(const item of fetchCartList){
                    dispatch(addItemToCart(item));
                }
            }

            if(cartList.length !==0 && fetchCartList.length ===0){
                for(const item of cartList){
                    await addCartList(item._id)
                }
            }

             if (cartList.length !== 0 && fetchCartList.length !== 0) {
                    const fetchCartMap = new Map(fetchCartList.map(item => [item._id, item]));
                    const cartMap = new Map(cartList.map(item => [item._id, item]));

                    
                    for (const fetchedItem of fetchCartList) {
                        if (!cartMap.has(fetchedItem._id)) {
                            dispatch(addItemToCart(fetchedItem));
                        }
                    }

                    
                    for (const cartItem of cartList) {
                        if (!fetchCartMap.has(cartItem._id)) {
                            await addCartList(cartItem._id);
                        }
                    }

                    
                    for (const [itemId, fetchedItem] of fetchCartMap) {
                        if (cartMap.has(itemId)) {
                            const cartItem = cartMap.get(itemId);
                            if (cartItem.quantityToBuy !== fetchedItem.quantityToBuy) {
                                dispatch(updateCartQuantity({ ...cartItem, quantityToBuy: fetchedItem.quantityToBuy }));
                                await updateCartList(itemId, fetchedItem.quantityToBuy);
                            }
                        }
                    }
                }


                if (wishListList.length === 0 && fetchWishList.length !== 0) {
                    for (const item of fetchWishList) {
                        dispatch(addItemToWishList(item));
                    }
                }

                if (wishListList.length !== 0 && fetchWishList.length === 0) {
                    for (const item of wishListList) {
                        await addWishList(item._id);
                    }
                }

                if (wishListList.length !== 0 && fetchWishList.length !== 0) {
                    const fetchWishMap = new Map(fetchWishList.map(item => [item._id, item]));
                    const wishMap = new Map(wishListList.map(item => [item._id, item]));

                    for (const fetchedItem of fetchWishList) {
                        if (!wishMap.has(fetchedItem._id)) {
                            dispatch(addItemToWishList(fetchedItem));
                        }
                    }

                    for (const wishItem of wishListList) {
                        if (!fetchWishMap.has(wishItem._id)) {
                            await addWishList(wishItem._id);
                        }
                    }
                }
           
            setProfile(false)
        }
    }

    return (
        <div className="container-login-signup">
            <div className="inner-container">
                <div className="logo-section">
                    <img className="logo-image" src={Logo} alt="Logo" />
                    <p className="logo-text-login-signup">ONLINE BOOK SHOPPING</p>
                </div>
                <div className="form-section">
                    <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%", background: "white", borderRadius: "3%" }}>

                        <div className="form-container">
                            <div className="form-header">
                                <div className="form-tab" onClick={() => handleSign("login")}>
                                    <div className={`form-tab-text ${sign ? '' : 'active'}`}>LOGIN</div>
                                    {!sign && <div className="form-tab-indicator"></div>}
                                </div>
                                <div className="form-tab" onClick={() => handleSign("signUp")}>
                                    <div className={`form-tab-text ${sign ? 'active' : ''}`}>SIGNUP</div>
                                    {sign && <div className="form-tab-indicator"></div>}
                                </div>
                            </div>
                            {sign ? (
                                <div className="signup-form">
                                    <TextField id="signUpfullname" label="Full Name*" className="input-field" />
                                    <TextField id="signUpemailId" label="Email*" className="input-field" />
                                    <OutlinedInput
                                        id="signUppassword"
                                        placeholder="Password"
                                        type={showPassword ? "text" : "password"}
                                        className="input-field"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickShowPassword} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    <OutlinedInput
                                        id="signUpConfirmpassword"
                                        placeholder="ConfirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        className="input-field"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickShowPassword} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    
                                    <Button variant="contained" className="submit-button" sx={{ backgroundColor: "#A03037" }} onClick={newUser}>SignUp</Button>
                                </div>
                            ) : (
                                <div className="login-form">
                                    <TextField id='emailId' label="Email Id*" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <TextField id='password' label="Password*" className="input-field" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickShowPassword} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }} />

                                    <div className="forgot-password">Forgot Password?</div>

                                    <Button variant="contained" className="submit-button" sx={{ backgroundColor: "#A03037" }} onClick={handleLogin}>Login</Button>
                                    <div className="or-section">
                                        <hr className="divider" /> <span>OR</span> <hr className="divider" />
                                    </div>
                                    <div className="social-buttons">
                                        <Button variant="contained" className="facebook-button">Facebook</Button>
                                        <Button variant="outlined" className="google-button">Google</Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default LoginOrSignUp;