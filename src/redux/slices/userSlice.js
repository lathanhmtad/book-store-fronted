import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {
        username: ''
    },
    isAuthenticated: false
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        loginSuccess: (state) => {
            
        }
    },
})

// Action creators are generated for each case reducer function
export const { } = userSlice.actions

export default userSlice.reducer