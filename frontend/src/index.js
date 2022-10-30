import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './slices/index.js';
import io from 'socket.io-client';
import SocketApiContextProvider from './context/SocketApiContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
const socket = io.connect();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketApiContextProvider socket={socket}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketApiContextProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
