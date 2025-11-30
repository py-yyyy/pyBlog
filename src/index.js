import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import router from './router/index.js';
import { RouterProvider } from 'react-router-dom';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

