import { createSlice } from '@reduxjs/toolkit'

import { fetchCategoriesTree, createNewCategory, fetchCategories } from './categoryThunk'

const initialState = {
    loading: false,

    treeSelect: [],

    categories: [],
    totalElements: 0,
    totalPages: 1,
    currentPage: 1,

    openModal: false,

    showDrawerDetails: false,
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setOpenModal: (state, action) => {
            state.openModal = action.payload
        },

        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch categories tree
            .addCase(fetchCategoriesTree.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchCategoriesTree.fulfilled, (state, action) => {
                state.treeSelect = action.payload
                state.loading = false
            })
            .addCase(fetchCategoriesTree.rejected, (state) => {
                state.loading = false
            })

            // fetch categories
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload.data
                state.totalElements = action.payload.totalElements
                state.totalPages = action.payload.totalPages
                state.loading = false
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.loading = false
            })

            // create new category
            .addCase(createNewCategory.pending, (state) => {
                state.loading = true
            })
            .addCase(createNewCategory.fulfilled, (state, action) => {
                state.currentPage = 1
                state.loading = false
            })
            .addCase(createNewCategory.rejected, (state) => {
                state.loading = false
            })
    },
})

export const { setOpenModal, setCurrentPage } = categorySlice.actions

export default categorySlice.reducer