import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
});

const NO_RETRY_HEADER = 'x-no-retry'

const refreshAccessToken = async () => {
    const res = await instance.post('/api/v1/auth/refresh-token')
    return res;
}

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
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
    if (error.response && +error.response.status === 401 && !error.config.headers[NO_RETRY_HEADER]) {
        // Access token has expired, refresh it
        const res = await refreshAccessToken()
        error.config.headers[NO_RETRY_HEADER] = 'true'

        // Update the request headers with the new access token
        error.config.headers['Authorization'] = `Bearer ${res.accessToken}`;
        localStorage.setItem('accessToken', res.accessToken)

       // Retry the original request
       return instance.request(error.config);
    }

    if(error.config && error.response && error.response.status === 403 && error.config.url === '/api/v1/auth/refresh-token') {
        window.location.href = '/login'
    }

    if (error.response) {
        return error.response.data
    }
    return Promise.reject(error)
});

export default instance