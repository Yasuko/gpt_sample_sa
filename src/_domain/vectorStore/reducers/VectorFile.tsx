import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { duplicator, addArray } from '../../_helper/object.helper'
import {
    VectorFileFormType, initialVectorFileForm
} from './__type.vectorStore'

export interface ChatFormPropsInterface {
    ChatForm?: ChatFormType
    dispatch?: Dispatch
}
export type ChatFormInterface = ChatFormType
export const initialState: ChatFormType = initialChatForm

/**
 * ChatFormの状態管理を行うスライス。
 * 各リデューサーでChatFormの状態を操作します。
 */
const slice = createSlice({
    name: 'ChatForm',
    initialState,
    reducers: {
        /**
         * 新しいチャットを設定します。
         *
         * @param state - 現在の状態。
         * @param action - 新しいチャットデータ。
         */
        setNewChat: (
            state: ChatFormInterface,
            action: PayloadAction<Chat>
        ) => {
            return Object.assign({}, state, {
                newChat: action.payload
            });
        },

        /**
         * 新しいチャットを追加します。
         *
         * @param state - 現在の状態。
         * @param action - 追加するチャットの内容。
         */
        addNewChat: (
            state: ChatFormInterface,
            action: PayloadAction<UserMessage['content']>
        ) => {
            const chat = duplicator<ChatFormInterface['newChat']>(state.newChat);
            chat.content.push(action.payload[0]);
            return Object.assign({}, state, {
                newChat: chat,
                chatScreen: true
            });
        },

        /**
         * 新しいチャットを更新します。
         *
         * @param state - 現在の状態。
         * @param action - 更新するチャットの内容とID。
         */
        updateNewChat: (
            state: ChatFormInterface,
            action: PayloadAction<{
                content: UserMessage['content'],
                id: number,
            }>
        ) => {
            const chat = duplicator<ChatFormInterface['newChat']>(state.newChat);
            chat.content[action.payload.id] = action.payload.content[0];
            return Object.assign({}, state, {
                newChat: chat,
                chatScreen: true
            });
        },

        /**
         * 新しいチャットを削除します。
         *
         * @param state - 現在の状態。
         * @param action - 削除するチャットのID。
         */
        removeNewChat: (
            state: ChatFormInterface,
            action: PayloadAction<number>
        ) => {
            const chat = duplicator<ChatFormInterface['newChat']>(state.newChat);
            chat.content.splice(action.payload, 1);
            return Object.assign({}, state, {
                newChat: chat
            });
        },

        /**
         * チャットブロックを設定します。
         *
         * @param state - 現在の状態。
         * @param action - 設定するチャットブロック。
         */
        setChatBlock: (
            state: ChatFormInterface,
            action: PayloadAction<UserMessage>
        ) => {
            return Object.assign({}, state, {
                chatBlock: [action.payload]
            });
        },

        /**
         * チャットブロックを追加します。
         *
         * @param state - 現在の状態。
         * @param action - 追加するチャットブロック。
         */
        addChatBlock: (
            state: ChatFormInterface,
            action: PayloadAction<Chat>
        ) => {
            const cb = duplicator<Chat[]>(state.chatBlock);
            if (cb[0].role === 'developer' && cb[0].content === '') {
                cb[0] = action.payload;
            } else {
                cb.push(action.payload);
            }
            return Object.assign({}, state, {
                chatBlock: cb
            });
        },

        /**
         * オプションを設定します。
         *
         * @param state - 現在の状態。
         * @param action - 設定するオプションのキーと値。
         */
        setOptions: (
            state: any,
            action: PayloadAction<{
                        key: string,
                        option: Partial<ChatFormInterface['options']>
                    }>
        ) => {
            const op = duplicator(state.options);
            op[action.payload.key] = action.payload.option;
            return Object.assign({}, state, {
                options: op
            });
        },

        /**
         * 状態をリセットします。
         * 初期状態に戻します。
         */
        reset: () => {
            return initialState;
        },

        /**
         * 新しいチャットをリセットします。
         * 初期状態に戻します。
         */
        resetNewChat: (state: ChatFormInterface) => {
            return Object.assign({}, state, {
                newChat     : initialState.newChat,
                chatScreen  : false
            });
        },

        /**
         * チャットブロックをリセットします。
         * 初期状態に戻します。
         */
        resetChatBlock: (state: ChatFormInterface) => {
            return Object.assign({}, state, {
                chatBlock: initialState.chatBlock
            });
        },

        /**
         * オプションをリセットします。
         * 初期状態に戻します。
         */
        resetOptions: (state: ChatFormInterface) => {
            return Object.assign({}, state, {
                options: initialState.options
            });
        }
    }
});

export default slice.reducer
