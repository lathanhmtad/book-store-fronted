import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isDarkMode: false,
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode
        },

    },
})

export const { toggleDarkMode } = themeSlice.actions

export default themeSlice.reducer