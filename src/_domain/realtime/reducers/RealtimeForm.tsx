import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { duplicator, addArray } from '../../_helper/object.helper'
import { RealtimeFormType, initialRealtimeForm } from './__type.realtime'

export interface RealtimeFormPropsInterface {
    RealtimeForm?: RealtimeFormType
    dispatch?: Dispatch
}
export type RealtimeFormInterface = RealtimeFormType
export const initialState: RealtimeFormType = initialRealtimeForm

const slice = createSlice({
    name: 'RealtimeForm',
    initialState,
    reducers: {
        setNewChat: (
            state,
            action: PayloadAction<string>) => {
            return Object.assign({}, state, {
                newChat: action.payload
            })
        },
        setChatStack: (state: any, action: any) => {
            return Object.assign({}, state, {
                chatStack: action.chatStack
            })
        },
        setOptions: (state: any, action: any) => {
            const op = duplicator(state.options)
            op[action.key] = action.option
            return Object.assign({}, state, {
                options: op
            })
        },
        reset: () => {
            return initialState;
        }
    }
})

export default slice.reducer
