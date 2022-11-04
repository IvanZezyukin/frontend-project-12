import React from "react";
import { Provider } from 'react-redux';
import store from './slices/index.js';
import SocketApiContextProvider from './context/SocketApiContextProvider';
import io from "socket.io-client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const init = () => {

  const socket = io.connect();

  return (
    <Provider store={store}>
      <SocketApiContextProvider socket={socket}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketApiContextProvider>
    </Provider>
  )
};

export default init;
