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
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

const init = () => {

  const rollbarConfig = {
    accessToken: '1769bdc0a62741e0b9918ab76332bcbe',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  i18n.init({
    lng: 'ru',
    debug: true,
    resources,
  });

  const socket = io.connect();

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <SocketApiContextProvider socket={socket}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </SocketApiContextProvider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  )
};

export default init;
