import { createSlice } from '@reduxjs/toolkit'

import { fetchUserWithPagination, fetchUserById, createNewUser } from './userThunk'

const initialState = {
    loading: false,
    data: [],
    totalElements: 0,
    totalPages: 1,
    currentPage: 1,
    isCreateUserSuccess: false,
    showDrawerDetails: false,
    userDetailsWithId: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        closeDrawerDetails: (state) => {
            state.showDrawerDetails = false
        },
        resetIsCreateUserSuccess: (state) => {
            state.isCreateUserSuccess = false
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            // fetch users with pagination
            .addCase(fetchUserWithPagination.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchUserWithPagination.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.totalPages = action.payload.totalPages
                state.totalElements = action.payload.totalElements
                state.loading = false
            })
            .addCase(fetchUserWithPagination.rejected, (state) => {
                state.loading = false
            })

            // fetch users with id
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.userDetailsWithId = action.payload
                state.showDrawerDetails = true
                state.loading = false
            })
            .addCase(fetchUserById.rejected, (state) => {
                state.loading = false
            })

            // create new user
            .addCase(createNewUser.pending, (state) => {
                state.loading = true
            })
            .addCase(createNewUser.fulfilled, (state) => {
                state.isCreateUserSuccess = true
                state.loading = false
            })
            .addCase(createNewUser.rejected, (state) => {
                state.loading = false
            })
    },
})

// Action creators are generated for each case reducer function
export const { closeDrawerDetails, resetIsCreateUserSuccess } = userSlice.actions

export default userSlice.reducer