import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const publishApi = createApi({
  reducerPath: 'publishApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL
  }),
  tagTypes: ['Publish'],

  endpoints: (builder) => ({
    adminUnpublishDocumentList: builder.query({
      query: () => ({
        url: `adminunpublish_document_list`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${Cookies.get('dms_token')}`
        }
      }),
      providesTags: ['Publish']
    }),

    AllPublishDocument: builder.query({
      query: ({ search }) => ({
        url: `all_publish_document?search=${search}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${Cookies.get('dms_token')}`
        }
      }),
      providesTags: ['Publish']
    }),
    
    yourDocument: builder.query({
      query: () => ({
        url: `your_document`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${Cookies.get('dms_token')}`
        }
      }),
      providesTags: ['Publish']
    }),

    adminDocumentPublish: builder.mutation({
      query: (id) => {
        return {
          url: `admin_document_publish/${id}`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${Cookies.get('dms_token')}`
          }
        };
      },
      invalidatesTags: ['Publish']
    }),

    deleteUnpublishDocument: builder.mutation({
      query: (id) => ({
        url: `document/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${Cookies.get('dms_token')}`
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
          Authorization: `Bearer ${Cookies.get('dms_token')}`
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
          Authorization: `Bearer ${Cookies.get('dms_token')}`
        }
      }),
      providesTags: ['Publish']
    })
  })
});

export const {
  useAdminUnpublishDocumentListQuery,
  useAdminDocumentPublishMutation,
  useDeleteUnpublishDocumentMutation,
  useUnpublishDocumentQuery,
  useAllPublishDocumentQuery,
  useYourDocumentQuery,
  useDashboardPublishDocumentQuery
} = publishApi;
