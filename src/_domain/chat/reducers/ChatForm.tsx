import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { duplicator, addArray } from '../../_helper/object.helper'
import { ChatFormType, initialChatForm } from './__type.chat'

export interface ChatFormPropsInterface {
    ChatForm?: ChatFormType
    dispatch?: Dispatch
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
            })
        },
        addImage: (state: any, action: any) => {
            const img = duplicator(state.images)

            return Object.assign({}, state, {
                images: (img[0] === '')
                            ? [action.image]
                            : addArray(img, action.image, initialState.images)
            })
        },
        setChatBlock: (state: any, action: any) => {
            return Object.assign({}, state, {
                chatBlock: action.chatBlock
            })
        },
        setChatStack: (state: any, action: any) => {
            return Object.assign({}, state, {
                chatStack: action.chatStack
            })
        },
        setOptions: (
            state: any,
            action: PayloadAction<{
                        key: string,
                        option: Partial<ChatFormInterface['options']>
                    }>
        ) => {
            const op = duplicator(state.options)
            op[action.payload.key] = action.payload.option
            return Object.assign({}, state, {
                options: op
            })
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
            })
        },
        reset: () => {
            return initialState;
        }
    }
})

export default slice.reducer
