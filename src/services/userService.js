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
}

export default new UserService()