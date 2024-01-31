import { createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../../../services/userService'

export const fetchUserById = createAsyncThunk(
    'users/fetchUserById',
    async (uId) => {
        const response = await userService.getUserById(uId)
        return response
    }
)

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (uId) => {
        const response = await userService.getUserById(uId)
        return response
    }
)

export const fetchUserWithPagination = createAsyncThunk(
    'users/fetchUserWithPagination',
    async ({ page, size }) => {
        const response = await userService.getUsersWithPagination(page, size)
        return response
    }
)

export const createNewUser = createAsyncThunk(
    'users/createNewUser',
    async (payload) => {
        const response = await userService.createNewUser(payload)
        return response
    }
)