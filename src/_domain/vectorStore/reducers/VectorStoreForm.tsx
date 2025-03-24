import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
    VectorStoreFormType, initialVectorStoreForm
} from './__type.vectorStore'

export interface VectorStoreFormPropsInterface {
    VectorStoreForm?: VectorStoreFormInterface
    dispatch?: Dispatch
}
export type VectorStoreFormInterface = VectorStoreFormType
export const initialState: VectorStoreFormInterface = initialVectorStoreForm

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
            action: PayloadAction<Partial<VectorStoreFormType>>
        ) => {
            return Object.assign({}, state, action.payload)
        },
        reset: () => {
            return initialState
        },
    }
});

export default slice.reducer
