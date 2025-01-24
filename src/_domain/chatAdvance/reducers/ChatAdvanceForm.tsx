import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { duplicator, addArray } from '../../_helper/object.helper'
import { ChatFormType, initialChatForm } from './__type.chat'

export interface ChatAdvanceFormPropsInterface {
    ChatAdvanceForm?: ChatFormType
    dispatch?: Dispatch
}
export type ChatAdvanceFormInterface = ChatFormType
export const initialState: ChatFormType = initialChatForm

const slice = createSlice({
    name: 'ChatAdvanceForm',
    initialState,
    reducers: {
        setNewChat: (state: any, action: any) => {
            return Object.assign({}, state, {
                newChat: action.newChat
            })
        },
        setChatBlock: (state: any, action: any) => {
            return Object.assign({}, state, {
                chatBlock: action.chatBlock
            })
        },
        setOptions: (
            state: any,
            action: PayloadAction<{
                        key: string,
                        option: Partial<ChatAdvanceFormInterface['options']>
                    }>
        ) => {
            const op = duplicator(state.options)
            op[action.payload.key] = action.payload.option
            return Object.assign({}, state, {
                options: op
            })
        },
        addChatBlock: (state: any, action: any) => {
            const cb = duplicator(state.chatBlock)
            const chBlock = (cb[0].role === 'null')
                            ? [action.chatBlock]
                            : addArray(cb, action.chatBlock, initialState.chatBlock)
            console.log(chBlock)
            return Object.assign({}, state, {
                chatBlock: chBlock
            })
        },
        reset: () => {
            return initialState;
        }
    }
})

export default slice.reducer
