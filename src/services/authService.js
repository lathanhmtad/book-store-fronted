import axios from '../utils/customizeAxios'

export const register = (username, password) => {
    return axios.post(`/register?username=${username}&password=${password}`)
}

export const login = (username, password) => {
    return axios.post(`/login?username=${username}&password=${password}`)
}