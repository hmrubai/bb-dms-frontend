import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ConfigProvider } from './contexts/ConfigContext';

import './index.scss';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import AuthApi from './contexts/Api/AuthApi';

ReactDOM.render(
  <Provider store={store}>
    <AuthApi>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </AuthApi>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
