import { createSlice } from '@reduxjs/toolkit';
import { duplicator, addArray } from '../../_helper/object.helper'
import { ChatFormType, initialChatForm } from './__type.chat'

export interface ChatFormPropsInterface {
    ChatForm?: ChatFormType
    dispatch?: any
}
export type ChatFormInterface = ChatFormType
export const initialState: ChatFormType = initialChatForm

const slice = createSlice({
    name: 'ChatForm',
    initialState,
    reducers: {
        setNewChat: (state: any, action: any) => {
            return Object.assign({}, state, {
                newChat: action.newChat
            });
        },
        setChatBlock: (state: any, action: any) => {
            return Object.assign({}, state, {
                chatBlock: action.chatBlock
            });
        },
        setChatStack: (state: any, action: any) => {
            return Object.assign({}, state, {
                chatStack: action.chatStack
            });
        },
        setOptions: (state: any, action: any) => {
            const op = duplicator(state.options)
            op[action.key] = action.option
            return Object.assign({}, state, {
                options: op
            });
        },
        /*
        addChatStack: (state: any, action: any) => {
            const cs = duplicator(state.chatStack)
            return Object.assign({}, state, {
                chatStack: addArray(cs, action.chatStack, initialState.chatStack)
            });
        },*/
        addChatBlock: (state: any, action: any) => {
            const cb = duplicator(state.chatBlock)
            const chBlock = (cb[0].role === 'null')
                            ? [action.chatBlock]
                            : addArray(cb, action.chatBlock, initialState.chatBlock)
            console.log(chBlock)
            return Object.assign({}, state, {
                chatBlock: chBlock
            });
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;
