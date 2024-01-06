import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// import layouts
import Customer from './layouts/Customer';
import Admin from './layouts/Admin'

// import pages
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Users from './pages/Admin/Users'
import Products from './pages/Admin/Products';
import Dashboard from './pages/Admin/Dashboard'
import Roles from './pages/Admin/Roles'
import Privileges from './pages/Admin/Privileges'
import Login from './pages/Login'
import Register from './pages/Register'
import PageNotFound from './pages/PageNotFound'

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
        },
        {
            path: '*',
            element: <PageNotFound />
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