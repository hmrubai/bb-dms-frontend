import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';



const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: null,
}

export const authSlice = createSlice({
   
    name: 'auth',
    initialState,
    reducers: {
        
        authUser: (state, action) => {
        
            Cookies.set('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            // state.user = action.payload.user;
            // state.token = action.payload.token;
        },

        logout: (state) => {
            Cookies.remove('token');
            localStorage.removeItem('user');
            state.user = null;
            state.token = null;
        }

    }
})

export const { authUser } = authSlice.actions;
export default authSlice.reducer;
