import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const permissionApi = createApi({
  reducerPath: 'permissionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL
  }),
  tagTypes: ['Permission'],

  endpoints: (builder) => ({
    getAllPermission: builder.query({
      query: () => ({
        url: `permission`,
        // transformResponse: res => res.sort((a, b) => b.id - a.id),
        // transformResponse: (res) => res.reverse(),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('dms_token')}`,
          'Content-type': 'application/json; charset=UTF-8'
          // "Authorization": `Bearer ${localStorage.getItem("dms_token")}`
        }
      }),
      // transformResponse: (res) => res.reverse(),
      providesTags: ['Permission']
    }),

    getCatagoryById: builder.query({
      query: (id) => ({
        url: `category/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('dms_token')}`,
          'Content-type': 'application/json; charset=UTF-8'
          // "Authorization": `Bearer ${localStorage.getItem("dms_token")}`
        }
      }),
      invalidatesTags: ['Category']
    }),

    addCatagory: builder.mutation({
      query: (catagory) => {
        return {
          url: `category`,
          method: 'POST',
          body: catagory,
          headers: {
            Authorization: `Bearer ${Cookies.get('dms_token')}`
            // 'Content-type': 'application/json; charset=UTF-8'
          }
        };
      },
      invalidatesTags: ['Category']
    }),
    updateCatagory: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `category/${id}`,
          method: 'POST',
          body: data,
          headers: {
            Authorization: `Bearer ${Cookies.get('dms_token')}`
            // 'Content-type': 'application/json; charset=UTF-8'
          }
        };
      },
      invalidatesTags: ['Category']
    }),

    deleteCatagory: builder.mutation({
      query: (id) => ({
        url: `category/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${Cookies.get('dms_token')}`
          // 'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      invalidatesTags: ['Category']
    }),

    getCategoryAllShow: builder.query({
      query: () => ({
        url: `category_all`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('dms_token')}`,
          'Content-type': 'application/json; charset=UTF-8'
          // "Authorization": `Bearer ${localStorage.getItem("dms_token")}`
        }
      }),
      // transformResponse: (res) => res.reverse(),
      providesTags: ['Category']
    }),

    getSubCatagoryShow: builder.query({
      query: (id) => ({
        url: `category_show/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('dms_token')}`,
          'Content-type': 'application/json; charset=UTF-8'
          // "Authorization": `Bearer ${localStorage.getItem("dms_token")}`
        }
      }),
      invalidatesTags: ['Category']
    }),

    allCategory: builder.query({
      query: () => ({
        url: `category_all`,
        // transformResponse: res => res.sort((a, b) => b.id - a.id),
        // transformResponse: (res) => res.reverse(),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('dms_token')}`,
          'Content-type': 'application/json; charset=UTF-8'
          // "Authorization": `Bearer ${localStorage.getItem("dms_token")}`
        }
      }),
      // transformResponse: (res) => res.reverse(),
      providesTags: ['Category']
    })
  })
});

export const {
  useGetAllPermissionQuery,
  useGetCatagoryByIdQuery,
  useAddCatagoryMutation,
  useUpdateCatagoryMutation,
  useDeleteCatagoryMutation,
  useGetCategoryAllShowQuery,
  useGetSubCatagoryShowQuery,
  useAllCategoryQuery
} = permissionApi;
