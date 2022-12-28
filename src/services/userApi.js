import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL
  }),
  tagTypes: ['User'],

  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (page = 1) => ({
        url: `users?page=${page}`,
        // transformResponse: res => res.sort((a, b) => b.id - a.id),
        // transformResponse: (res) => res.reverse(),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          'Content-type': 'application/json; charset=UTF-8'
          // "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }),
      // transformResponse: (res) => res.reverse(),
      providesTags: ['User']
    }),

    totalUser: builder.query({
      query: () => ({
        url: `all_user/`,
        // transformResponse: res => res.sort((a, b) => b.id - a.id),
        // transformResponse: (res) => res.reverse(),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          'Content-type': 'application/json; charset=UTF-8'
          // "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }),
      // transformResponse: (res) => res.reverse(),
      providesTags: ['User']
    }),

    getUserById: builder.query({
      query: (id) => ({
        url: `users/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          'Content-type': 'application/json; charset=UTF-8'
          // "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }),
      invalidatesTags: ['User']
    }),

    addUser: builder.mutation({
      query: (user) => {
        return {
          url: `users`,
          method: 'POST',
          body: user,
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
            // 'Content-type': 'application/json; charset=UTF-8'
          }
        };
      },
      invalidatesTags: ['User']
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `users/${id}`,
          method: 'POST',
          body: data,
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
            // 'Content-type': 'application/json; charset=UTF-8'
          }
        };
      },
      invalidatesTags: ['User']
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
          // 'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      invalidatesTags: ['User']
    })
  })
});

export const {
  useGetAllUserQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useTotalUserQuery
} = userApi;
