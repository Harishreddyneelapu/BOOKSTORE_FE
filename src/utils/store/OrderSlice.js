import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
    name:"order",
    initialState:{
        pageLoads: true,
        pageLoadsWishList: true,
        
    },
    reducers:{
        setLoaded:(state,action) =>{  
            state.pageLoads = (action.payload);
        },
        setLoadedWishList:(state,action) =>{  
            state.pageLoadsWishList = (action.payload);
        },
    }
})

export const{ setLoaded,setLoadedWishList } = OrderSlice.actions;
export default OrderSlice.reducer;