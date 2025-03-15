import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
    VectorStoreType, initialVectorStore
} from './__type.vectorStore'

export interface VectorStoreFormPropsInterface {
    VectorStoreForm?: VectorStoreType
    dispatch?: Dispatch
}
export type VectorStoreFormInterface = VectorStoreType
export const initialState: VectorStoreFormInterface = initialVectorStore

/**
 * ChatFormの状態管理を行うスライス。
 * 各リデューサーでChatFormの状態を操作します。
 */
const slice = createSlice({
    name: 'VectorStoreForm',
    initialState,
    reducers: {
        update: (
            state: VectorStoreFormInterface,
            action: PayloadAction<Partial<VectorStoreType>>
        ) => {
            return Object.assign({}, state, action.payload)
        },
        reset: () => {
            return initialState
        },
    }
});

export default slice.reducer
