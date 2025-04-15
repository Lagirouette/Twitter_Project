import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slice'
import users from '@/features/User'
import posts from '@/features/Posts'

export const makeStore = () => {
  return configureStore({
    reducer: {
        counter : counterReducer,
        users,
        posts
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']