import axios from '../utils/customizeAxios'

class UserService {
    login(email, password) {
        return axios.post('/api/v1/auth/login', { email, password })
    }

    createNewUser(formData) {
        return axios({
            method: 'post',
            url: '/api/v1/users',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
    }

    getUsersWithPagination(page, limit) {
        return axios.get(`/api/v1/users?page=${page}&limit=${limit}`)
    }

    deleteUser(id) {
        return axios.delete(`api/v1/users/${id}`)
    }
}

export default new UserService()