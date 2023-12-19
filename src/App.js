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

import { Route, Routes } from 'react-router-dom';


const App = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Customer />}>
                    <Route index element={<Home />} />
                    <Route path='product/:id' element={<ProductDetail />} />
                </Route>

                <Route path='/admin' element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path='products' element={<Products />} />
                </Route>

                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </>
    )
}

export default App