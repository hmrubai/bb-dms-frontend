import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import reducers from './reducers';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { catagoryApi } from './../services/catagoryApi';
import { subCategoryApi } from '../services/subCategoryApi';

import { subSubCategoryApi } from './../services/subSubCategoryApi';

const store = configureStore({
  reducer: {
    reducers,
    [catagoryApi.reducerPath]: catagoryApi.reducer,
    [subCategoryApi.reducerPath]: subCategoryApi.reducer,
    [subSubCategoryApi.reducerPath]: subSubCategoryApi.reducer,

    devTools: true
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    [
      catagoryApi.middleware,
      subCategoryApi.middleware,
      subSubCategoryApi.middleware
    
    ])
});
setupListeners(store.dispatch);
export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

export default store;
