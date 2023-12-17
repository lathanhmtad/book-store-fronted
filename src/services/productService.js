import axios from '../utils/customizeAxios'

export const fetchAllProducts = () => {
    return axios.get('/books')
}