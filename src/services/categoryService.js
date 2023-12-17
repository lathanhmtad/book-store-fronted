import axios from '../utils/customizeAxios'

export const fetchAllCategories = () => {
    return axios.get('/categories')
}
