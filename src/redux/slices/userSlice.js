import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    isAuthenticated: false
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = {}
            state.isAuthenticated = false
        },
        loginSuccess: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
    },
})

// Action creators are generated for each case reducer function
export const { logoutUser, loginSuccess } = userSlice.actions

export default userSlice.reducer