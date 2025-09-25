import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { duplicator, addArray } from '../../_helper/object.helper'
import {
    ResponseHistoryObjectType,
    ResponseHistoryType,
    initialResponseHistory,
} from './__type.response'

export interface ResponseHistoryPropsInterface {
    ResponseHistory?: ResponseHistoryObjectType
    dispatch?: Dispatch
}
export type ResponseHistoryInterface = ResponseHistoryObjectType
export const initialState: ResponseHistoryObjectType = initialResponseHistory

/**
 * ResponseHistoryの状態管理を行うスライス。
 * 各リデューサーでResponseHistoryの状態を操作します。
 */
const slice = createSlice({
    name: 'ResponseHistory',
    initialState,
    reducers: {
        /**
         * 履歴を上書ききします。
         *
         * @param state - 現在の状態。
         * @param action - 新しいチャットデータ。
         */
        set: (
            state: ResponseHistoryObjectType,
            action: PayloadAction<ResponseHistoryType[]>
        ) => {
            return action.payload && action.payload.length > 0
                ? { historys: [...action.payload] }
                : { historys: [] };
        },

        /**
         * 履歴を追加します。
         *
         * @param state - 現在の状態。
         * @param action - 追加するチャットの内容。
         */
        add: (
            state: ResponseHistoryObjectType,
            action: PayloadAction<ResponseHistoryType[]>
        ) => {
            const h = duplicator(state.historys);
            h.push(...action.payload);
            return { historys: h };
        },

        removeHistory: (
            state: ResponseHistoryObjectType,
            action: PayloadAction<number>
        ) => {
            console.log(action.payload);
            const h = duplicator(state.historys);
            h.splice(action.payload, 1);
            return Object.assign({}, state, {
                historys: h
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
