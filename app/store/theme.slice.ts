import { createSlice, type Dispatch } from '@reduxjs/toolkit'

const light = 'light'
const dark = 'dark'

export type ThemeState = {
    mode: typeof light | typeof dark
}

const initialState: ThemeState = { mode: dark }

export const themeSlice = createSlice({
    name: 'theme', initialState,
    reducers: {
        setTheme: (state) => {
            state.mode = state.mode === dark ? light : dark
        }
    }
})

export function setThemeAction(dispatch: Dispatch<any>) {
    dispatch(themeSlice.actions.setTheme())
}