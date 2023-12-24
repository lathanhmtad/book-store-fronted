import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


const initialState = {
    isOpenSidebarCart: false,
    itemAmount: 0
}

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        setIsOpenSidebarCart: (state, action) => {
            state.isOpenSidebarCart = action.payload
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
    },
})

// Action creators are generated for each case reducer function
export const { setIsOpenSidebarCart } = cartSlice.actions

export default cartSlice.reducer