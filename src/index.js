import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import apps
import Customer from './app/Customer';
import Admin from './app/Admin'

// import pages
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Products from './pages/admin/Products';
import Dashboard from './pages/admin/Dashboard'
import PageNotFound from './pages/PageNotFound'

// import css
import './css/Common.scss'
import 'bootstrap/dist/css/bootstrap.min.css';


import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Customer />}>
          <Route index element={<Home />} />
          <Route path='product/:id' element={<ProductDetail />} />
        </Route>

        <Route path='/admin' element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path='products' element={<Products />} />
        </Route>

        <Route path='*' element={<PageNotFound />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
