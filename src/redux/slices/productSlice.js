import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchAllProducts, productsPagination, fetchBooksByCategoryId, searchBooks } from '../../services/productService'

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async () => {
        const res = await fetchAllProducts()
        return res
    }
)

export const fetchProductsWithPagination = createAsyncThunk(
    'product/fetchProductsWithPagination',
    async (payload) => {
        const res = await productsPagination(payload.page, payload.limit)
        return res
    }
)

export const fetchBooksByIdCategory = createAsyncThunk(
    'product/fetchBooksByCategoryId',
    async (id) => {
        const res = await fetchBooksByCategoryId(id)
        return res
    }
)

export const fetchBookBySearchTerm = createAsyncThunk(
    'product/fetchBookBySearchTerm',
    async (search) => {
        const res = await searchBooks(search)
        return res
    }
)

const initialState = {
    data: {},
    products: [],
    size: 0
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
        builder.addCase(fetchBooksByIdCategory.fulfilled, (state, action) => {
            state.products = action.payload
            state.size = null
        })
        builder.addCase(fetchProductsWithPagination.fulfilled, (state, action) => {
            state.products = action.payload.book
            state.size = action.payload.size
        })
        builder.addCase(fetchBookBySearchTerm.fulfilled, (state, action) => {
            state.products = action.payload
            state.size = null
        })
    },
})

// Action creators are generated for each case reducer function
export const { } = productSlice.actions

export default productSlice.reducer