import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { duplicator, addArray } from '../../_helper/object.helper'
import {
    ResponseFormType,
    initialResponseForm,
} from './__type.response'

export interface ResponseFormPropsInterface {
    ResponseForm?: ResponseFormType
    dispatch?: Dispatch
}
export type ResponseFormInterface = ResponseFormType
export const initialState: ResponseFormType = initialResponseForm

/**
 * ResponseFormの状態管理を行うスライス。
 * 各リデューサーでResponseFormの状態を操作します。
 */
const slice = createSlice({
    name: 'ResponseForm',
    initialState,
    reducers: {
        /**
         * 新しいチャットを設定します。
         *
         * @param state - 現在の状態。
         * @param action - 新しいチャットデータ。
         */
        set: (
            state: ResponseFormType,
            action: PayloadAction<ResponseFormType>
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
        add: (
            state: ResponseFormType,
            action: PayloadAction<Partial<ResponseFormType>>
        ) => {
            // Immerのドラフトを直接更新する（新しいオブジェクトは返さない）
            if (typeof action.payload.text === 'string') {
                state.text = action.payload.text;
            }
            if (action.payload.image && action.payload.image.length > 0) {
                state.image.push(...action.payload.image);
            }
            if (action.payload.file && action.payload.file.length > 0) {
                state.file.push(...action.payload.file);
            }
            if (action.payload.audio && action.payload.audio.length > 0) {
                state.audio.push(...action.payload.audio);
            }
        },

        removeImage: (
            state: ResponseFormType,
            action: PayloadAction<number>
        ) => {
            const image = duplicator(state.image);
            image.splice(action.payload, 1);
            return Object.assign({}, state, {
                image
            });
        },

        removeFile: (
            state: ResponseFormType,
            action: PayloadAction<number>
        ) => {
            const file = duplicator(state.file);
            file.splice(action.payload, 1);
            return Object.assign({}, state, {
                file
            });
        },

        removeAudio: (
            state: ResponseFormType,
            action: PayloadAction<number>
        ) => {
            const audio = duplicator(state.audio);
            audio.splice(action.payload, 1);
            return Object.assign({}, state, {
                audio
            });
        },

        /**
         * 状態をリセットします。
         * 初期状態に戻します。
         */
        reset: () => {
            return initialState;
        },

    }
});

export default slice.reducer
