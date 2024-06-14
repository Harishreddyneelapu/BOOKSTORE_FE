import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
    },
    reducers: {
        addItemToCart: (state, action) => {
            state.cartItems.push(action.payload);
        },
        updateCartQuantity: (state, action) => {
            state.cartItems = state.cartItems.map((cartBook) => {
                if (cartBook._id === action.payload._id) {
                    return { ...cartBook, quantityToBuy: action.payload.quantityToBuy }
                }
                return cartBook
            })
        },
        deleteCartItem: (state, action) => {
            state.cartItems = state.cartItems.filter((book) => book._id !== action.payload)
        },
        putCartItem: (state, action) => {
            state.cartItems = action.payload
        }
    }
})
export const { addItemToCart, updateCartQuantity, deleteCartItem, putCartItem } = cartSlice.actions;
export default cartSlice.reducer;