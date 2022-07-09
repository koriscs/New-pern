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
    },
})

export const { addItemToCartRedux } = cartSlice.actions;

export default cartSlice.reducer;