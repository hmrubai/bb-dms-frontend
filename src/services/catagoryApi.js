import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const catagoryApi = createApi({
  reducerPath: 'catagoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL
  }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getAllCatagory: builder.query({
      query: (page = 1) => ({
        url: `category?page=${page}`,
        // transformResponse: res => res.sort((a, b) => b.id - a.id),
        // transformResponse: (res) => res.reverse(),
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
          // "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }),
      // transformResponse: (res) => res.reverse(),
      providesTags: ['Category']
    }),

    getCatagoryById: builder.query({
      query: (id) => ({
        url: `category/${id}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
          // "Authorization": `Bearer ${localStorage.getItem("token")}`
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
            // 'Content-type': 'application/json; charset=UTF-8'
          }
        };
      },
      invalidatesTags: ['Category']
    }),
    updateCatagory: builder.mutation({
      query: ({id ,data}) => {
        return {
          url: `category/${id}`,
          method: 'POST',
          body: data,
       
        };
      },
      invalidatesTags: ['Category']
      
    }),

    deleteCatagory: builder.mutation({
      query: (id) => ({
        url: `category/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Category']
    }),
   
    getCategoryAllShow: builder.query({
      query: () => ({
        url: `category_all`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
          // "Authorization": `Bearer ${localStorage.getItem("token")}`
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
          'Content-type': 'application/json; charset=UTF-8'
          // "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }),
      invalidatesTags: ['Category']
    })


  })
});

export const {
  useGetAllCatagoryQuery,
  useGetCatagoryByIdQuery,
  useAddCatagoryMutation,
  useUpdateCatagoryMutation,
  useDeleteCatagoryMutation,
  useGetCategoryAllShowQuery,
  useGetSubCatagoryShowQuery
} = catagoryApi;
