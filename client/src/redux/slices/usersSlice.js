import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    address: {}
}

export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addAccountInfo: (state, {payload}) =>{
            state.user = payload;
        },
        addAddressInfo: (state, {payload}) =>{
            state.address = payload;
        },
        deleteAccountInfo: (state, {payload}) =>{
            state.user = payload;
        }
    },
})

export const {addAccountInfo, addAddressInfo, deleteAccountInfo} = usersSlice.actions;

export default usersSlice.reducer;