import axios from '../utils/customizeAxios'

export const fetchRoles = () => {
    return axios.get('/api/v1/roles')
}