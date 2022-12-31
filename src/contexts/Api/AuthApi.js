import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { authUser,userPermission } from '../../features/authSlice';

export const authApiContext = React.createContext();

const AuthApi = ({ children }) => {
  const [resData, setRes] = useState();
  const [ErrData, setError] = useState();

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
      setRes(response.data);
      window.location.replace(`${process.env.REACT_APP_APP_URL}auth/signin`);
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

      const permissions = [];
      toast.success(response.data[0].message);
       response.data[0].user.user_has_permission.map((item) => {
         permissions.push(item.permission.name);
       });
      dispatch(userPermission(permissions));
      dispatch(authUser(response.data[0]));
      window.location.replace(`${process.env.REACT_APP_APP_URL}dashboard`);
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

  const userGetById = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}users/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // setResData(response.data.token);
      setRes(response.data);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return <authApiContext.Provider value={{ registration, login, logOut, resData, ErrData ,userGetById}}>{children}</authApiContext.Provider>;
};

export default AuthApi;
