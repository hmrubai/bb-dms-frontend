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

    AllPublishDocument: builder.query({
      query: ({ search }) => ({
        url: `all_publish_document?search=${search}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      }),
      providesTags: ['Publish']
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
      invalidatesTags: ['Publish']
    }),

    yourDocument: builder.query({
      query: () => ({
        url: `your_document`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      }),
      providesTags: ['Publish']
    }),

    deleteUnpublishDocument: builder.mutation({
      query: (id) => ({
        url: `document/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      }),
      invalidatesTags: ['Publish']
    }),

    unpublishDocument: builder.query({
      query: (id) => ({
        url: `document/${id}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      }),
      // invalidatesTags: ['DocumentData'],
      providesTags: ['Publish']
    }),
    dashboardPublishDocument: builder.query({
      query: () => ({
        url: `dashboard_Publish_Document`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      }),
      providesTags: ['Publish']
    })
  })
});

export const { useAllUserforGroupQuery,
  useCreateGroupMutation,
} = groupApi;
