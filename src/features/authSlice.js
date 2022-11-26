import { createSlice } from "@reduxjs/toolkit";
import  Cookies  from 'js-cookie';

const initialState = {
    user: null,
    token: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            Cookies.set('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            state.user = action.payload.user;
            state.token = action.payload.token;
            
        },

        logout: (state) => {
            Cookies.remove('token');
            localStorage.removeItem('user');
            state.user = null;
            state.token = null;
        }
    }
})

export const { loginUser, logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;



export default authSlice.reducer;