import { getAuth } from '@/lib/utils'
import { createSlice } from '@reduxjs/toolkit'
import { cookies } from 'next/headers'

export interface LoginState {
    isLogined: boolean,
    loginDialogOpen: boolean
}
const initialState: LoginState = {
    isLogined: getAuth() ? true : false,
    loginDialogOpen: false
}
export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        updateIsLogined: (state, action) => {
            state.isLogined = action.payload
        },
        updateLoginDialogOpen: (state, action) => {
            state.loginDialogOpen = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { updateIsLogined, updateLoginDialogOpen } = loginSlice.actions

export default loginSlice.reducer