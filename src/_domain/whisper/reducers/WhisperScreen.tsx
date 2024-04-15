import { createSlice } from '@reduxjs/toolkit'
import {
    WhisperScreenType, WhisperScreenInitialState
} from './type.Wisper'

export interface WhisperScreenPropsInterface {
    WhisperScreen?: WhisperScreenType
    dispatch?: any
}
export type WhisperScreenInterface = WhisperScreenType
export const initialState: WhisperScreenInterface = WhisperScreenInitialState

const slice = createSlice({
    name: 'WhisperScreen',
    initialState,
    reducers: {
        toggleShowText: (state: any, action: any) => {
            return Object.assign({}, state, {
                showText: (state.showText)? false: true
            })
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
})

export default slice.reducer
