import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

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
import Privileges from './pages/admin/Privileges'
import Login from './pages/Login'
import Register from './pages/Register'

// import css
import './css/Common.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Customer />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: "product/:id",
                    element: <ProductDetail />,
                },
            ],
        },
        {
            path: "/admin",
            element: <Admin />,
            children: [
                {
                    index: true,
                    element: <Dashboard />
                },
                {
                    path: 'users',
                    element: <Users />
                },
                {
                    path: 'roles',
                    element: <Roles />
                },
                {
                    path: 'products',
                    element: <Products />
                },
                {
                    path: 'privileges',
                    element: <Privileges />
                }
            ]
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: '/register',
            element: <Register />,
        }
    ]);

    return (
        <>
            <RouterProvider router={router} />

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