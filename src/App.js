import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

// import layouts
import CustomerLayout from './Layouts/CustomerLayout';
import AdminLayout from './Layouts/AdminLayout';

// import pages
import PageNotFound from './Pages/NotFound/PageNotFound'
import DashboardPage from './Pages/Admin/Dashboard/DashboardPage'
import AuthPage from './Pages/Auth/AuthPage';
import UserPage from './Pages/Admin/User/UserPage';
import PrivateRoute from './Pages/ProtectedRoute/PrivateRoute';

// import css
import './App.scss'
import 'react-toastify/dist/ReactToastify.css';

import userService from './services/userService';

import { setLoading, setUserInfo } from './redux/slices/authSlice';
import CategoryPage from './Pages/Admin/Category/CategoryPage';

const App = () => {
    const dispatch = useDispatch()
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const getCurrentUser = async () => {
        dispatch(setLoading(true))
        const res = await userService.getCurrentUser()
        dispatch(setUserInfo(res))
        dispatch(setLoading(false))
    }

    useEffect(() => {
        if (isAuthenticated) {
            getCurrentUser()
        }
    }, [isAuthenticated])

    const router = createBrowserRouter([
        {
            path: "/admin",
            element: <PrivateRoute>
                <AdminLayout />
            </PrivateRoute>,
            children: [
                {
                    index: true,
                    element: <DashboardPage />
                },
                {
                    path: 'users',
                    element: <UserPage />
                },
                {
                    path: 'categories',
                    element: <CategoryPage />
                }
            ]
        },
        {
            path: "/",
            element: <CustomerLayout />
        },
        {
            path: '/auth',
            element: <AuthPage />
        },
        {
            path: '*',
            element: <PageNotFound />
        }
    ]);

    return (
        <div>
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
                theme={isDarkMode ? 'dark' : 'light'}
            />

        </div>
    )
}

export default App;
