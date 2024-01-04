import axios from '../utils/customizeAxios'

export const login = (email, password) => {
    return axios.post('/api/v1/auth/login', { email, password })
}
