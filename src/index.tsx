import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

let container = document.getElementById('root');
if (container == null) {
  throw new Error("Can't initialize react");
}
const root = ReactDOMClient.createRoot(container);
root.render(
  <React.StrictMode>
    <head>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </head>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
