import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authUser } from '../../features/authSlice';

export const authApiContext = React.createContext();

const AuthApi = ({ children }) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const registration = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/register`, data, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      toast.success(response.data.message);
      window.location.replace('http://localhost:3000/auth/signin');
    } catch (error) {
      if (error.response.data.errors.password) {
        toast.warning(error.response.data.errors.password[0]);
      }
      if (error.response.data.errors.email) {
        toast.warning(error.response.data.errors.email[0]);
      }
      console.log(error.response);
    }
  };

  const login = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/login`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      toast.success(response.data[0].message);
      dispatch(authUser(response.data[0]));
      window.location.replace('http://localhost:3000/dashboard');
     

    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  //   const signout = async () => {
  //     try {
  //       const response = await axios.get(`${process.env.REACT_APP_SRVER_BASE_URL}/auth/signout`, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${localStorage.getItem('token')}`
  //         }
  //       });
  //       // setResData(response.data.token);
  //       toast.success(response.data.messages);
  //       window.location.reload(false);
  //     } catch (error) {
  //       toast.error(error.response.data.messages);
  //     }
  //   };

  const logOut = () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    toast.success('Logout Successfully');
    window.location.reload(false);
  };

  return <authApiContext.Provider value={{ registration, login, logOut }}>{children}</authApiContext.Provider>;
};

export default AuthApi;
