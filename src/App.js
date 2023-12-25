// import apps
import Customer from './app/Customer';
import Admin from './app/Admin'

// import pages
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Products from './pages/admin/Products';
import Dashboard from './pages/admin/Dashboard'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import Register from './pages/Register'

// import css
import './css/Common.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Customer />}>
                    <Route index element={<Home />} />
                    <Route path='product/:id' element={<ProductDetail />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                </Route>

                <Route path='/admin' element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path='products' element={<Products />} />
                </Route>

                <Route path='*' element={<PageNotFound />} />
            </Routes>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default App