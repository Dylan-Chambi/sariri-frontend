import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import GoogleContextProvider from './context/googleContext';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

    <BrowserRouter>
        <GoogleContextProvider>
            <App />
        </GoogleContextProvider>
    </BrowserRouter>
);

