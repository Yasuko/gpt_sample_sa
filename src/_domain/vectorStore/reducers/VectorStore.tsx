import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { duplicator, addArray } from '../../_helper/object.helper'
import {
    VectorStoreType, initialVectorStore
} from './__type.vectorStore'

export interface VectorStorePropsInterface {
    VectorStore?: VectorStoreType
    dispatch?: Dispatch
}
export type VectorStoreInterface = {
    VectorStores: VectorStoreType[]
}
export const initialState: VectorStoreInterface = {
    VectorStores: []
}

/**
 * ChatFormの状態管理を行うスライス。
 * 各リデューサーでChatFormの状態を操作します。
 */
const slice = createSlice({
    name: 'VectorStore',
    initialState,
    reducers: {

        set: (
            state: VectorStoreInterface,
            action: PayloadAction<VectorStoreType>
        ) => {
            return Object.assign({}, state, {
                VectorStores: action.payload
            });
        },
        add: (
            state: VectorStoreInterface,
            action: PayloadAction<VectorStoreType>
        ) => {
            const stores = duplicator<VectorStoreInterface['VectorStores']>(state.VectorStores)
            stores.push(action.payload)
            return Object.assign({}, state, {
                VectorStores: stores
            });
        },

        reset: () => {
            return initialState;
        },
    }
});

export default slice.reducer
