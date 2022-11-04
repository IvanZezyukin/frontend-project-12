import React from "react";
import { Provider } from 'react-redux';
import store from './slices/index.js';
import SocketApiContextProvider from './context/SocketApiContextProvider';
import io from "socket.io-client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import resources from './locales/index';

const init = () => {

  i18n.init({
    lng: 'ru',
    debug: true,
    resources,
  });

  const socket = io.connect();

  return (
    <Provider store={store}>
      <SocketApiContextProvider socket={socket}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </I18nextProvider>
      </SocketApiContextProvider>
    </Provider>
  )
};

export default init;
