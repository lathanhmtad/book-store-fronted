import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchAllCategories } from '../../services/categoryService'

export const fetchCategories = createAsyncThunk(
    'category/fetchCategories',
    async () => {
        const res = await fetchAllCategories()
        return res
    }
)

const initialState = {
    categories: []
}

export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
        setCategories: (state) => {

        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload
        })
    },
})

// Action creators are generated for each case reducer function
export const { } = categorySlice.actions

export default categorySlice.reducer