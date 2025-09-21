import React from 'react';
import ReactDOM from 'react-dom/client';
import { TwaWebAppProvider } from '@twa-dev/sdk'; // 1. Импортируем Provider
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Оборачиваем наше приложение в этот Provider */}
    <TwaWebAppProvider>
      <App />
    </TwaWebAppProvider>
  </React.StrictMode>
);
