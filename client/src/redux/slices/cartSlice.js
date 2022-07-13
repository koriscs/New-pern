import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartRedux: [],
    itemCount: 0,
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCartRedux: (state, action) => {
            state.cartRedux.push(action.payload);
        },
        deleteReduxCart: (state, action) =>{
            state.cartRedux = action.payload;
        },
        setItemCount: (state, {payload}) =>{
            state.itemCount = payload;
        },
        deleteItemFromRedux: (state, action) =>{
            state.cartRedux = state.cartRedux.filter(items => !(items.product_id === action.payload.product_id && items.size === action.payload.size));
        },
        updateQuantity: (state,{payload}) =>{
            state.cartRedux = state.cartRedux.map(items =>{
                if(items.product_id === payload.product_id && items.size === payload.size) {
                   items.quantity = payload.quantity;
                   return items;
                }
                return items;
            })
        },
       
    },
})

export const { setItemCount, addItemToCartRedux, deleteReduxCart, deleteItemFromRedux, updateQuantity} = cartSlice.actions;

export default cartSlice.reducer;