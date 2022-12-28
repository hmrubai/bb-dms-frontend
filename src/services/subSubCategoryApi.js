import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const subSubCategoryApi = createApi({
  reducerPath: 'subSubCategoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL
  }),
  tagTypes: ['SubSubCategory'],
  endpoints: (builder) => ({
    getAllSubSubCategory: builder.query({
      query: (page = 1) => ({
        url: `sub_sub_category?page=${page}`,
        // transformResponse: res => res.sort((a, b) => b.id - a.id),
        // transformResponse: (res) => res.reverse(),
        method: 'GET',
        headers: {
              "Authorization": `Bearer ${Cookies.get("token")}`,
          'Content-type': 'application/json; charset=UTF-8'
          // "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }),
      // transformResponse: (res) => res.reverse(),
      providesTags: ['SubSubCategory']
    }),

    getSubSubCategoryById: builder.query({
      query: (id) => ({
        url: `sub_sub_category/${id}`,
        method: 'GET',
        headers: {
              "Authorization": `Bearer ${Cookies.get("token")}`,
          'Content-type': 'application/json; charset=UTF-8'
          // "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }),
      invalidatesTags: ['SubSubCategory']
    }),

    addSubSubCategory: builder.mutation({
      query: (SubSubCategory) => {
        return {
          url: `sub_sub_category`,
          method: 'POST',
          body: SubSubCategory,
          headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`,
            // 'Content-type': 'application/json; charset=UTF-8'
          }
        };
      },
      invalidatesTags: ['SubSubCategory']
    }),
    updateSubSubCatagory: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `sub_sub_category/${id}`,
          method: 'POST',
          body: data,
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
            // 'Content-type': 'application/json; charset=UTF-8'
          }
        };
      },
      invalidatesTags: ['SubSubCategory']
    }),

    deleteSubSubCategory: builder.mutation({
      query: (id) => ({
        url: `sub_sub_category/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
          // 'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      invalidatesTags: ['SubSubCategory']
    })
  })
});

export const {
  useGetAllSubSubCategoryQuery,
  useGetSubSubCategoryByIdQuery,
  useAddSubSubCategoryMutation,
  useUpdateSubSubCatagoryMutation,
  useDeleteSubSubCategoryMutation
} = subSubCategoryApi;
