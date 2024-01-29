import axios from "axios";
import { doLogout, updateAccessToken } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

let store

export const injectStore = _store => {
    store = _store
}

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.Authorization = `Bearer ${store.getState().auth.userToken}`
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const originalRequest = error.config
    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        const response = await instance.post('/api/v1/auth/refresh-token')
        const { newAccessToken } = response
        store.dispatch(updateAccessToken(newAccessToken))
        originalRequest.headers.Authorization = `Bearer ${store.getState().auth.userToken}`
        return instance.request(originalRequest)
    }

    if (error.response && error.response.status === 403 && error.config.url === '/api/v1/auth/refresh-token') {
        toast.error('Please login again to use the application!', {
            toastId: 2,
            autoClose: 7000
        })
        store.dispatch(doLogout())
    }

    if (error.response) {
        return error.response.data
    }
    return error;
});

export default instance