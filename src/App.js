import { Route, Routes } from 'react-router-dom';

// import apps
import Customer from './app/Customer';
import Admin from './app/Admin'

// import pages
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Users from './pages/admin/Users'
import Products from './pages/admin/Products';
import Dashboard from './pages/admin/Dashboard'
import Roles from './pages/admin/Roles'
import Authorities from './pages/admin/Authorities'

// import css
import './css/Common.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

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
                    <Route path='users' element={<Users />} />
                    <Route path='roles' element={<Roles />} />
                    <Route path='products' element={<Products />} />
                    <Route path='authorities' element={<Authorities />} />
                </Route>
            </Routes>
        </>
    )
}

export default App