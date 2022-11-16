import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import reducers from './reducers';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { catagoryApi } from './../services/catagoryApi';


const store = configureStore({
  reducer: {
    reducers,
    [catagoryApi.reducerPath]: catagoryApi.reducer,

    devTools: true
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([catagoryApi.middleware,])
});
setupListeners(store.dispatch);
export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

export default store;
