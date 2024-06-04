import { configureStore } from '@reduxjs/toolkit'
import login from './features/login'
import userReducer from './features/user'
import loginReducer from './features/login'
import playerReducer from './features/player'

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      login: loginReducer,
      player:playerReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']