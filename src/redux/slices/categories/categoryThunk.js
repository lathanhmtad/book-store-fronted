import { createAsyncThunk } from '@reduxjs/toolkit'
import categoryService from '../../../services/categoryService'
import { CATEGORIES_MAX_ITEMS_PER_PAGE } from '../../../utils/appConstant'

export const fetchCategoriesTree = createAsyncThunk(
    'category/fetchCategoriesTree',
    async () => {
        const response = await categoryService.getCategoriesTree()
        return response
    }
)

export const fetchCategories = createAsyncThunk(
    'category/fetchCategories',
    async ({ page, size }) => {
        const response = await categoryService.getAllCategories(page, size)
        return response
    }
)

export const createNewCategory = createAsyncThunk(
    'category/createNewCategory',
    async (data, thunkAPI) => {
        const response = await categoryService.createCategory(data)
        thunkAPI.dispatch(fetchCategories({ page: 1, size: CATEGORIES_MAX_ITEMS_PER_PAGE }))
        return response
    }
)