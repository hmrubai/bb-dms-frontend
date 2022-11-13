import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import authUser from '../../utils/authUser';
export const authApiContext = React.createContext();

const AuthApi = ({ children }) => {
  // const [resData, setResData] = useState(null);
  // const [resError, setResError] = useState(null);
  const history=useHistory()
  const registration = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/register`, data, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      toast.success(response.data.message);
      window.location.replace("http://localhost:3000/auth/signin");
      
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
      console.log(response);
      toast.success(response.data[0].message);
      Cookies.set('token', response.data[0].token);
      window.location.reload(false)

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
    toast.success('Logout Successfully');
    window.location.reload(false);
  };

  return <authApiContext.Provider value={{ registration, login, logOut }}>{children}</authApiContext.Provider>;
};

export default AuthApi;
