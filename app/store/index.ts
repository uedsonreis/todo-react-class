import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { themeSlice } from './theme.slice'
import { taskSlice } from './task.slice'

const myStorage = {
    getItem: async (key: string) => {
        if (storage.getItem) return await storage.getItem(key)
        return null
    },
    setItem: async (key: string, item: string) => {
        if (storage.setItem) return await storage.setItem(key, item)
    },
    removeItem: async (key: string) => {
        if (storage.removeItem) return await storage.removeItem(key)
    },
}

export const store = configureStore({
    reducer: persistReducer(
        { key: 'TODO_APP', storage: myStorage },
        combineReducers({
            theme: themeSlice.reducer,
            task: taskSlice.reducer,
        })
    )
})

export const persistor = persistStore(store)