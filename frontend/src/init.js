import React from 'react';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import resources from './locales/index';
import App from './App';
import SocketApiContextProvider from './context/SocketApiContextProvider';
import store from './slices/index.js';

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
  );
};

export default init;
