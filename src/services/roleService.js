import axios from '../utils/customizeAxios'

class RoleService {
    getRolesWithPagination(page, limit) {
        return axios.get(`/api/v1/roles?page=${page}&limit=${limit}`)
    }

    getRoles() {
        return axios.get('api/v1/roles/all')
    }

    addRoles(roles) {
        return axios.post('/api/v1/roles', { roles })
    }

    updateRole(id, dataUpdate) {
        return axios.put(`/api/v1/roles/${id}`, dataUpdate)
    }

    deleteRole(id) {
        return axios.delete(`/api/v1/roles/${id}`)
    }

    deleteAll(ids) {
        return axios.delete('api/v1/roles', {
            data: ids
        })
    }
}

export default new RoleService()