import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const groupApi = createApi({
  reducerPath: 'groupApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL
  }),
  tagTypes: ['Group'],

  endpoints: (builder) => ({
    allUserforGroup: builder.query({
      query: () => ({
        url: `all_user_for_Group`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      }),
      providesTags: ['Group']
    }),

    createGroup: builder.mutation({
      query: (group) => {
        return {
          url: `create_group`,
          method: 'POST',
          body: group,
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        };
      },
      invalidatesTags: ['Group']
    }),

    userWiseGroupView: builder.query({
      query: () => ({
        url: `user_wise_group_view`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      }),
      providesTags: ['Group']
    }),

     addGroupDocument: builder.mutation({
      query: (document) => {
        return {
          url: `create_group_documnet`,
          method: 'POST',
          body: document,
          headers: {
            // 'Content-type': 'application/json; charset=UTF-8'
          
              "Authorization": `Bearer ${Cookies.get("token")}`
       
          }
        };
      },
      invalidatesTags: ['Group']
    }),
 

    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `delete_group/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      }),
      invalidatesTags: ['Group']
    }),
    // get_group_document
    groupDocument: builder.query({
      query: (id) => ({
        url: `get_group_document/${id}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          "Authorization": `Bearer ${Cookies.get("token")}`
        }
      }),
      providesTags: ['Group']
      // providesTags: (result, error, arg) =>
      // result
      //   ? [...result.map(({ id }) => ({ type: 'DocumentData', id })), 'DocumentData']
      //   : ['DocumentData'],
    }),
    

  })
});

export const {
  useAllUserforGroupQuery,
  useCreateGroupMutation,
  useUserWiseGroupViewQuery,
  useAddGroupDocumentMutation,
  useGroupDocumentQuery,
  useDeleteGroupMutation
} = groupApi;

