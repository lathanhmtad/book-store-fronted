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

// Action creators are generated for each case reducer function
export const { toggleDarkMode } = themeSlice.actions

export default themeSlice.reducer