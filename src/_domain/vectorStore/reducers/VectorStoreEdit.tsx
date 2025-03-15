import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
    VectorStoreType, initialVectorStore
} from './__type.vectorStore'

export interface VectorStoreEditPropsInterface {
    VectorStoreEdit?: VectorStoreType
    dispatch?: Dispatch
}
export type VectorStoreEditInterface = VectorStoreType

export const initialState: VectorStoreEditInterface = initialVectorStore

/**
 * ChatFormの状態管理を行うスライス。
 * 各リデューサーでChatFormの状態を操作します。
 */
const slice = createSlice({
    name: 'VectorStoreEdit',
    initialState,
    reducers: {

        set: (
            state: VectorStoreEditInterface,
            action: PayloadAction<VectorStoreType>
        ) => {
            return action.payload
        },
        update: (
            state: VectorStoreEditInterface,
            action: PayloadAction<Partial<VectorStoreType>>
        ) => {
            return Object.assign({}, state, action.payload);
        },
        reset: () => {
            return initialState;
        },
    }
});

export default slice.reducer
