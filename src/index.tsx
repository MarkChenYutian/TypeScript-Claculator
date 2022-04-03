import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';

let container = document.getElementById('root');
if (container == null) {
  throw new Error("Can't initialize react");
}
const root = ReactDOMClient.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

