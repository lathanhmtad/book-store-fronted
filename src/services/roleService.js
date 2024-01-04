import axios from '../utils/customizeAxios'

class RoleService {
    getRoles(page, limit) {
        return axios.get(`/api/v1/roles?page=${page}&limit=${limit}`)
    }

    addRoles(roles) {
        return axios.post('/api/v1/roles', { roles })
    }

    updateRole(dataUpdate) {
        return axios.put(`/api/v1/roles/${dataUpdate.id}`, dataUpdate)
    }

    deleteRole(id) {
        return axios.delete(`/api/v1/roles/${id}`)
    }
}

export default new RoleService()