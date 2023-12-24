import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import categorySlice from './slices/categorySlice'
import productSlice from './slices/productSlice'
import cartSlice from './slices/cartSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        category: categorySlice,
        product: productSlice,
        cart: cartSlice
    },
})
