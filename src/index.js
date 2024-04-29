import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ProductDetails from "./Components/ProductDetails/ProductDetails";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ProductDetails>
        <App />
    </ProductDetails>
);