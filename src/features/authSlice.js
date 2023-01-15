import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';



const initialState = {
    user: localStorage.getItem('dms_user') ? JSON.parse(localStorage.getItem('dms_user')) : null,
    permissions: localStorage.getItem('dms_permissions') ? JSON.parse(localStorage.getItem('dms_permissions')) : null,
    token: null,

}

export const authSlice = createSlice({
   
    name: 'auth',
    initialState,
    reducers: {
        
        authUser: (state, action) => {
        
            Cookies.set('dms_token', action.payload.token);
            localStorage.setItem('dms_user', JSON.stringify(action.payload.user));
            // state.user = action.payload.user;
            // state.token = action.payload.token;
        },
        userPermission: (state, action) => {
            localStorage.setItem('dms_permissions', JSON.stringify(action.payload));
        },

        logout: (state) => {
            Cookies.remove('dms_token');
            localStorage.removeItem('dms_user');
            localStorage.removeItem('dms_permissions');
            state.user = null;
            state.Permissions = null;
            state.token = null;
        }

    }
})

export const { authUser,userPermission } = authSlice.actions;
export default authSlice.reducer;
