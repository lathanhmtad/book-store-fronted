import { createSlice } from '@reduxjs/toolkit'

import { fetchUserWithPagination, fetchUserById, createNewUser, updateUser } from './userThunk'

const initialState = {
    loading: false,

    users: [],
    totalElements: 0,
    totalPages: 1,
    currentPage: 1,

    openModal: false,

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
            state.userDetailsWithId = {}
        },
        resetIsCreateUserSuccess: (state) => {
            state.isCreateUserSuccess = false
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setOpenModal: (state, action) => {
            if(action.payload) {
                state.userDetailsWithId = {}
            } 
            state.openModal = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch users with pagination
            .addCase(fetchUserWithPagination.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchUserWithPagination.fulfilled, (state, action) => {
                state.users = action.payload.data
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

            // update user
            .addCase(updateUser.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.openModal = true
                state.userDetailsWithId = action.payload
                state.loading = false
            })
            .addCase(updateUser.rejected, (state) => {
                state.loading = false
            })
    },
})

export const { closeDrawerDetails, resetIsCreateUserSuccess, setCurrentPage, setOpenModal } = userSlice.actions

export default userSlice.reducer