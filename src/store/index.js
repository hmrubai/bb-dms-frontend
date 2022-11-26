import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import reducers from './reducers';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { userApi } from '../services/userApi';
import { catagoryApi } from './../services/catagoryApi';
import { subCategoryApi } from '../services/subCategoryApi';
import { subSubCategoryApi } from './../services/subSubCategoryApi';
import { documentApi } from '../services/documentApi';
import { authApi } from '../services/authApi';
import apiReducer from './../features/authSlice'

const store = configureStore({
  reducer: {
    reducers,
    auth:apiReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [catagoryApi.reducerPath]: catagoryApi.reducer,
    [subCategoryApi.reducerPath]: subCategoryApi.reducer,
    [subSubCategoryApi.reducerPath]: subSubCategoryApi.reducer,
    [documentApi.reducerPath]: documentApi.reducer,

    devTools: true
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      catagoryApi.middleware,
      subCategoryApi.middleware,
      subSubCategoryApi.middleware,
      documentApi.middleware
    ])
});
setupListeners(store.dispatch);
export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

export default store;
