import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchRoles } from '../../services/roleService'

export const fetchRoleOptions = createAsyncThunk(
    'role/fetchRoleOptions',
    async () => {
        const res = await fetchRoles()
        return res
    }
)

const initialState = {
    loading: false,
    roleOptions: []
}

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoleOptions.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchRoleOptions.fulfilled, (state, action) => {
                state.roleOptions = action.payload.map(item => ({label: item.name, value: item.id}))
                state.loading = false
            })
            .addCase(fetchRoleOptions.rejected, (state) => {
                state.loading = false
            })
    }
})

export const { } = roleSlice.actions

export default roleSlice.reducer