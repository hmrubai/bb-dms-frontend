import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const documentApi = createApi({
  reducerPath: 'documentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL
  }),
  tagTypes: ['Document'],
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (page = 1) => ({
        url: `document?page=${page}`,
        // transformResponse: res => res.sort((a, b) => b.id - a.id),
        // transformResponse: (res) => res.reverse(),
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
          // "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }),
      // transformResponse: (res) => res.reverse(),
      providesTags: ['Document']
    }),

    getUserById: builder.query({
      query: (id) => ({
        url: `document/${id}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
          // "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }),
      invalidatesTags: ['Document']
    }),

    addDocument: builder.mutation({
      query: (document) => {
        return {
          url: `document`,
          method: 'POST',
          body: document,
          headers: {
            // 'Content-type': 'application/json; charset=UTF-8'
          }
        };
      },
      invalidatesTags: ['Document']
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `users/${id}`,
          method: 'POST',
          body: data
        };
      },
      invalidatesTags: ['Document']
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Document']
    }),

    showCategoryDocument: builder.query({
      query: (id) => ({
        url: `category_document/${id}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
          // "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }),
      invalidatesTags: ['Document']
    })



  })
});

export const { useGetAllUserQuery, useGetUserByIdQuery, useAddDocumentMutation, useUpdateUserMutation, useDeleteUserMutation ,useShowCategoryDocumentQuery} =
documentApi;
