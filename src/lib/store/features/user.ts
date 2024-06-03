import { getAuth } from '@/lib/utils'
import { createSlice } from '@reduxjs/toolkit'
import { cookies } from 'next/headers'
export interface UserState {
    userInfo: {
        email: string
    }
}
const initialState: UserState = {
    userInfo: getAuth() || {
        email: ""
    }
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserInfo: (state, action) => {
            state.userInfo = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { updateUserInfo } = userSlice.actions

export default userSlice.reducer