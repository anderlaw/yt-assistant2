import { createSlice } from '@reduxjs/toolkit'

export interface PlayerState {
    isDialogOpen: boolean,
    videoInfo?: {
        title: string,
        path: string,
        filenames: string[]
    }
}
const initialState: PlayerState = {
    isDialogOpen: false,
    videoInfo: undefined
}
export const PlayerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        updateIsDialogOpen: (state, action) => {
            state.isDialogOpen = action.payload
        },
        updateVideoInfo: (state, action) => {
            state.videoInfo = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { updateIsDialogOpen, updateVideoInfo } = PlayerSlice.actions

export default PlayerSlice.reducer