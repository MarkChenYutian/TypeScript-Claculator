//https://tekinico.medium.com/build-a-react-embeddable-widget-c46b7f7999d8

import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import { GlobalStyles } from '@mui/material';

let container = document.getElementById('claculator-interactive');
if (container == null) {
  throw new Error("Can't initialize react");
}
const root = ReactDOMClient.createRoot(container);
root.render(
  <React.StrictMode>
    <GlobalStyles styles={{
      p: {margin: '0 !important'}
    }}/>
    <ScopedCssBaseline>
      <App styleMode={container.dataset.mode}/>
    </ScopedCssBaseline>
  </React.StrictMode>
);

