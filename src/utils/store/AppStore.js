import {configureStore} from '@reduxjs/toolkit'
import CartSlice from './CartSlice';
import WishListSlice from './WishListSlice';
import AddressSlice from "./AddressSlice";



const appStore = configureStore({
    reducer : {
        cart : CartSlice,
        wishList : WishListSlice,
        address : AddressSlice,
    }
})

export default appStore;