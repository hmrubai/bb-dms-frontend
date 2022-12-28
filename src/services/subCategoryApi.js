import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const subCategoryApi = createApi({
  reducerPath: 'subCategoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL
  }),
  tagTypes: ['SubCategory'],
  endpoints: (builder) => ({
    getAllSubCategory: builder.query({
      query: (page = 1) => ({
        url: `sub_category?page=${page}`,
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
      providesTags: ['SubCategory']
    }),

    getSubCategoryById: builder.query({
      query: (id) => ({
        url: `sub_category/${id}`,
        method: 'GET',
        headers: {
              "Authorization": `Bearer ${Cookies.get("token")}`,
          'Content-type': 'application/json; charset=UTF-8'
          // "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }),
      invalidatesTags: ['SubCategory']
    }),

    addSubCategory: builder.mutation({
      query: (SubCategory) => {
        return {
          url: `sub_category`,
          method: 'POST',
          body: SubCategory,
          headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`,
            // 'Content-type': 'application/json; charset=UTF-8'
          }
        };
      },
      invalidatesTags: ['SubCategory']
    }),
    updateSubCatagory: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `sub_category/${id}`,
          method: 'POST',
          body: data,
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
            // 'Content-type': 'application/json; charset=UTF-8'
          }
        };
      },
      invalidatesTags: ['SubCategory']
    }),

    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `sub_category/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
          // 'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      invalidatesTags: ['SubCategory']
    }),

    getSubSubCatagoryShow: builder.query({
      query: (id) => ({
        url: `sub_category_show/${id}`,
        method: 'GET',
        headers: {
              "Authorization": `Bearer ${Cookies.get("token")}`,
          'Content-type': 'application/json; charset=UTF-8'
          // "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }),
       providesTags: ['SubCategory']
    })
  })
  
});

export const {
  useGetAllSubCategoryQuery,
  useGetSubCategoryByIdQuery,
  useAddSubCategoryMutation,
  useUpdateSubCatagoryMutation,
  useDeleteSubCategoryMutation,
  useGetSubSubCatagoryShowQuery
} = subCategoryApi;
