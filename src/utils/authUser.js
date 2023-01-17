import React from 'react'
import Cookies from 'js-cookie';
function authUser(token) {
    const setToken = Cookies.set('token', token);
    const getToken = Cookies.get('token')
    
    return [setToken,getToken]
 
}

export default authUser