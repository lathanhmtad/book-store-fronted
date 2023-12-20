import axios from '../util/customizeAxios'

export const fetchAllCategories = () => {
    return axios.get('/categories')
}
