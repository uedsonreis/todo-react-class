import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { themeSlice } from './theme.slice'
import { taskSlice } from './task.slice'

export const store = configureStore({
    reducer: combineReducers({
        theme: themeSlice.reducer,
        task: taskSlice.reducer,
    })
})