import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    address: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getAccountInfo: (state, {payload}) =>{
            state.user = payload;
        },
        getAddressInfo: (state, {payload}) =>{
            state.address = payload;
        }
    },
})

export const {getAccountInfo, getAddressInfo} = authSlice.actions;

export default authSlice.reducer;