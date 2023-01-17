import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const documentApi = createApi({
  reducerPath: 'documentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL
  }),
  tagTypes: ['DocumentData'],
  endpoints: (builder) => ({
    getAllDocument: builder.query({
      query: (page = 1) => ({
        url: `document`,
        // transformResponse: res => res.sort((a, b) => b.id - a.id),
        // transformResponse: (res) => res.reverse(),
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          "Authorization": `Bearer ${Cookies.get("dms_token")}`
        }
      }),
      // transformResponse: (res) => res.reverse(),
      providesTags: ['Document']
    }),


    showCategoryDocument: builder.query({
      query: (id) => ({
        url: `category_document/${id}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          "Authorization": `Bearer ${Cookies.get("dms_token")}`
        }
      }),
      // invalidatesTags: ['DocumentData'],
      providesTags: (result, error, arg) =>
      result
        ? [...result.map(({ id }) => ({ type: 'DocumentData', id })), 'DocumentData']
        : ['DocumentData'],
    }),
    
    showSubCategory: builder.query({
      query: (id) => ({
        url: `show_sub_category/${id}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          "Authorization": `Bearer ${Cookies.get("dms_token")}`
        }
      }),
      // invalidatesTags: ['DocumentData'],
      providesTags: (result, error, arg) =>
      result
        ? [...result.map(({ id }) => ({ type: 'DocumentData', id })), 'DocumentData']
        : ['DocumentData'],
    }),
    
  
    showSubCategoryDocument: builder.query({
      query: (id) => ({
        url: `show_sub_category_document/${id}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          "Authorization": `Bearer ${Cookies.get("dms_token")}`
        }
      }),
      // invalidatesTags: ['DocumentData'],
      providesTags: (result, error, arg) =>
      result
        ? [...result.map(({ id }) => ({ type: 'DocumentData', id })), 'DocumentData']
        : ['DocumentData'],
    }),

   
  showSubSubCategory: builder.query({
      query: (id) => ({
        url: `show_sub_sub_category/${id}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          "Authorization": `Bearer ${Cookies.get("dms_token")}`
        }
      }),
      // invalidatesTags: ['DocumentData'],
      providesTags: (result, error, arg) =>
      result
        ? [...result.map(({ id }) => ({ type: 'DocumentData', id })), 'DocumentData']
        : ['DocumentData'],
  }),
  
  
    
 showSubSubCategoryDocument: builder.query({
      query: (id) => ({
        url: `show_sub_sub_category_document/${id}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          "Authorization": `Bearer ${Cookies.get("dms_token")}`
        }
      }),
      // invalidatesTags: ['DocumentData'],
      providesTags: (result, error, arg) =>
      result
        ? [...result.map(({ id }) => ({ type: 'DocumentData', id })), 'DocumentData']
        : ['DocumentData'],
    }),

    addDocument: builder.mutation({
      query: (document) => {
        return {
          url: `document`,
          method: 'POST',
          body: document,
          headers: {
            // 'Content-type': 'application/json; charset=UTF-8'
          
              "Authorization": `Bearer ${Cookies.get("dms_token")}`
       
          }
        };
      },
      invalidatesTags: ['DocumentData']
    }),
 


    deleteDocument: builder.mutation({
      query: (id) => ({
        url: `document/${id}`,
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${Cookies.get("dms_token")}`
        }
      }),
      invalidatesTags: ['DocumentData']
    }),

    getDocumentById: builder.query({
      query: (id) => ({
        url: `document/${id}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          "Authorization": `Bearer ${Cookies.get("dms_token")}`
        }
      }),
      providesTags: ['DocumentData']
    }),

    updateDocument: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `document/${id}`,
          method: 'POST',
          body: data,
          headers: {
            "Authorization": `Bearer ${Cookies.get("dms_token")}`
          }

        };
      },
      invalidatesTags: ['DocumentData']
    }),

    documentpublish: builder.mutation({
      query: (id) => {
        return {
          url: `document_publish/${id}`,
          method: 'POST',
          headers: {
            "Authorization": `Bearer ${Cookies.get("dms_token")}`
          }

        };
      },
      invalidatesTags: ['DocumentData']
    }),
 
    }),

  })



export const {
  useAddDocumentMutation,
  useDeleteDocumentMutation,
  useShowCategoryDocumentQuery,
  useShowSubCategoryQuery,
  useShowSubCategoryDocumentQuery,
  useShowSubSubCategoryQuery,
  useShowSubSubCategoryDocumentQuery,
  useGetAllDocumentQuery,
  useGetDocumentByIdQuery,
  useUpdateDocumentMutation,
  useDocumentpublishMutation,
} = documentApi;
