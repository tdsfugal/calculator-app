import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'emotion';

import App from './app/App';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();

injectGlobal`
  body {
    background-color: #eee;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`;
