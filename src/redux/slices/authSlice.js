import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    isAuthenticated: false,
    userToken: '', // for storing the jwt
    userInfo: {},
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.loading
        },
        loginSuccess(state, action) {
            state.isAuthenticated = true
            state.userToken = action.payload.accessToken
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        doLogout(state) {
            state.isAuthenticated = false
            state.userToken = ''
            state.username = ''
        },
        updateAccessToken(state, action) {
            state.userToken = action.payload
        }
    },
})

export const { loginSuccess, doLogout, setUserInfo, updateAccessToken, setLoading } = authSlice.actions

export default authSlice.reducer