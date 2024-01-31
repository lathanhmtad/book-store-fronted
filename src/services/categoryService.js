import axios from '../utils/customizeAxios'

class CategoryService {
    getCategoriesTree() {
        return axios.get('/api/v1/categories/tree')
    }

    getAllCategories(page, size) {
        return axios.get(`/api/v1/categories?page=${page}&limit=${size}`)
    }

    createCategory(data) {
        return axios.post('/api/v1/categories', data)
    }
}

export default new CategoryService()