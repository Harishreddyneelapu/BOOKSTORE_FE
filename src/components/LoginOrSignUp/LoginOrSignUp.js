import { Box, Button, IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Logo from '../../assets/shoppingCart.png';
import React from "react";
import './LoginOrSignUp.css';
import { useSelector } from "react-redux";
import { loginApiCall, signUpApiCall } from "../../services/UserService";
import { addCartList, getCartDetailsApiCall } from "../../services/BookService";
import { Link, useNavigate } from "react-router-dom";

const LoginOrSignUp = ({ profile, setProfile }) => {
    const [sign, setSign] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [name, setName] = useState("")
    const [emailValidator, setEmailValidator] = useState(false);
    const [passwordValidator, setPasswordValidator] = useState(false);
    // const [accessToken, setAccessToken] = useState(false)
    // const navigate = useNavigate()

    const cartList = useSelector((store) => store.cart.cartItems)

    // const token = localStorage.getItem("accessToken")

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

        const loginObj = {
            email: email,
            password: password
        }
        if (!emailValidator && !passwordValidator) {
            const res = await loginApiCall(loginObj);
            const fetchCartList = await getCartDetailsApiCall();
            console.log(fetchCartList);

            if (fetchCartList.length === 0 && cartList.length !== 0) {
                for (const item of cartList) {
                    await addCartList(item._id)
                }
            }

            if (cartList.length !== 0 && fetchCartList.length === 0) {
                for (const item of cartList) {
                    const isInFetchCartList = fetchCartList.some((fetchedItem) => fetchedItem._id === item._id);
                    if (!isInFetchCartList) {
                        await addCartList(item._id);
                    }
                }
            }
            localStorage.setItem("accessToken", res.data.data.token);
            <Link to={"/dashboard/allBooks"}></Link>
            setProfile(false)
            // navigate("/dashboard/allBooks")
        }
    }

    return (
        <div className="container">
            <div className="inner-container">
                <div className="logo-section">
                    <img className="logo-image" src={Logo} alt="Logo" />
                    <p className="logo-text">ONLINE BOOK SHOPPING</p>
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
