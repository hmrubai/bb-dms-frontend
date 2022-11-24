import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const catagoryApi = createApi({
  reducerPath: 'catagoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL
  }),
  tagTypes: ['Catagory'],
  endpoints: (builder) => ({
    getAllCatagory: builder.query({
      query: (page = 1) => ({
        url: `catagory?page=${page}`,
        // transformResponse: res => res.sort((a, b) => b.id - a.id),
        // transformResponse: (res) => res.reverse(),
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
          // "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }),
      // transformResponse: (res) => res.reverse(),
      providesTags: ['Catagory']
    }),

    getCatagoryById: builder.query({
      query: (id) => ({
        url: `catagory/${id}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
          // "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }),
      invalidatesTags: ['Catagory']
    }),

    addCatagory: builder.mutation({
      query: (catagory) => {
        return {
          url: `catagory`,
          method: 'POST',
          body: catagory,
          headers: {
            // 'Content-type': 'application/json; charset=UTF-8'
          }
        };
      },
      invalidatesTags: ['Catagory']
    }),
    updateCatagory: builder.mutation({
      query: ({id ,data}) => {
        return {
          url: `catagory/${id}`,
          method: 'POST',
          body: data,
       
        };
      },
      invalidatesTags: ['Catagory']
      
    }),

    deleteCatagory: builder.mutation({
      query: (id) => ({
        url: `catagory/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Catagory']
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
      providesTags: ['Catagory']
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
      invalidatesTags: ['Catagory']
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
