import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import roleService from '../../services/roleService'

export const fetchRoles = createAsyncThunk(
    'roles/fetchRoles',
    async (payload) => {
        const response = await roleService.getRoles(payload.page, payload.limit)
        return response
    }
)

const initialState = {
    data: [],
    totalPages: 1
}

// Then, handle actions in your reducers:
const roleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.totalPages = action.payload.totalPages
            })
    },
})

export const { } = roleSlice.actions
export default roleSlice.reducer