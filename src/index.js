import React from 'react';
import ReactDOM from 'react-dom';
import { PageHeader } from 'antd';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <PageHeader
      title="Movie Search App"
  />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);