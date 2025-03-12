import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { duplicator, addArray } from '../../_helper/object.helper'
import {
    Chat,
    ChatFormType, initialChatForm,
    UserMessage
} from './__type.chat'

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
        setNewChat: (
            state: ChatFormInterface,
            action: PayloadAction<Chat>
        ) => {
            return Object.assign({}, state, {
                newChat: action.payload
            })
        },
        addNewChat: (
            state: ChatFormInterface,
            action: PayloadAction<UserMessage['content']>
        ) => {
            const chat = duplicator<ChatFormInterface['newChat']>(state.newChat)
            chat.content.push(action.payload[0])
            return Object.assign({}, state, {
                newChat: chat,
                chatScreen: true
            })
        },
        updateNewChat: (
            state: ChatFormInterface,
            action: PayloadAction<{
                content: UserMessage['content'],
                id: number,
            }>
        ) => {
            const chat = duplicator<ChatFormInterface['newChat']>(state.newChat)
            chat.content[action.payload.id] = action.payload.content[0]
            return Object.assign({}, state, {
                newChat: chat,
                chatScreen: true
            })
        },
        removeNewChat: (
            state: ChatFormInterface,
            action: PayloadAction<number>
        ) => {
            const chat = duplicator<ChatFormInterface['newChat']>(state.newChat)
            chat.content.splice(action.payload, 1)
            return Object.assign({}, state, {
                newChat: chat
            })
        },

        setChatBlock: (
            state: ChatFormInterface,
            action: PayloadAction<UserMessage>
        ) => {
            return Object.assign({}, state, {
                chatBlock: [action.payload]
            })
        },
        addChatBlock: (
            state: ChatFormInterface,
            action: PayloadAction<Chat>
        ) => {
            const cb = duplicator<Chat[]>(state.chatBlock)
            if (cb[0].role === 'developer' && cb[0].content === '') {
                cb[0] = action.payload
            } else {
                cb.push(action.payload)
            }
            return Object.assign({}, state, {
                chatBlock: cb
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
        reset: () => {
            return initialState;
        },
        resetNewChat: (state: ChatFormInterface) => {
            return Object.assign({}, state, {
                newChat     : initialState.newChat,
                chatScreen  : false
            })
        },
        resetChatBlock: (state: ChatFormInterface) => {
            return Object.assign({}, state, {
                chatBlock: initialState.chatBlock
            })
        },
        resetOptions: (state: ChatFormInterface) => {
            return Object.assign({}, state, {
                options: initialState.options
            })
        }
    }
})

export default slice.reducer
