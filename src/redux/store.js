import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import categorySlice from './slices/categorySlice'
import productSlice from './slices/productSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        category: categorySlice,
        product: productSlice
    },
})
