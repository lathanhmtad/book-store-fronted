import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchAllProducts } from '../../services/productService'

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async () => {
        const res = await fetchAllProducts()
        return res
    }
)

const initialState = {
    products: []
}

export const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload
        })
    },
})

// Action creators are generated for each case reducer function
export const { } = productSlice.actions

export default productSlice.reducer