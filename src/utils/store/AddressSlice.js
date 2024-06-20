import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
    name : "address",
    initialState : {
        addressItems : [],
    },
    reducers : {
        addItemToAddress: (state, action) => {
          state.addressItems.push(action.payload);
        },
        editItemToAddress: (state, action) => {
        state.addressItems[action.payload.index] = action.payload.addressObj
          },
    }
})
export const {addItemToAddress,editItemToAddress} = addressSlice.actions;
export default addressSlice.reducer