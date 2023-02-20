import React from 'react';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import './i18n'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
);
