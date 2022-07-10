import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartRedux: [],
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
        deleteItemFromRedux: (state, action) =>{
            state.cartRedux = state.cartRedux.filter(items => !(items.product_id === action.payload.product_id && items.size === action.payload.size));
        },
        increaseQuantity: (state,{payload}) =>{
            state.cartRedux = state.cartRedux.map(items =>{
                if(items.product_id === payload.product_id && items.size === payload.size) {
                   items.quantity = items.quantity+1;
                   return items;
                }
                return items;
            })
        },
        decreaseQuantity: (state,{payload}) =>{
            state.cartRedux = state.cartRedux.map(items =>{
                if(items.product_id === payload.product_id && items.size === payload.size) {
                   items.quantity = items.quantity-1;
                   return items;
                }
                return items;
            })
        }
    },
})

export const { addItemToCartRedux, deleteReduxCart, deleteItemFromRedux, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;