import {configureStore} from '@reduxjs/toolkit'
import CartSlice from './CartSlice';
import WishListSlice from './WishListSlice';



const appStore = configureStore({
    reducer : {
        cart : CartSlice,
        wishList : WishListSlice,
    }
})

export default appStore;