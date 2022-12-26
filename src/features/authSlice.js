import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';



const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    permissions: localStorage.getItem('permissions') ? JSON.parse(localStorage.getItem('permissions')) : null,
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
        userPermission: (state, action) => {
            localStorage.setItem('permissions', JSON.stringify(action.payload));
        },

        logout: (state) => {
            Cookies.remove('token');
            localStorage.removeItem('user');
            localStorage.removeItem('permissions');
            state.user = null;
            state.Permissions = null;
            state.token = null;
        }

    }
})

export const { authUser,userPermission } = authSlice.actions;
export default authSlice.reducer;
