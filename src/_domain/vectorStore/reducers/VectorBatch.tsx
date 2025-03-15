import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { duplicator } from '../../_helper/object.helper'
import {
    VectorBatchType, 
} from './__type.vectorStore'

export interface VectorBatchPropsInterface {
    VectorStore?: VectorBatchInterface
    dispatch?: Dispatch
}
export type VectorBatchInterface = {
    batches: VectorBatchType[],
}
export const initialState: VectorBatchInterface = {
    batches: []
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
            state: VectorBatchInterface,
            action: PayloadAction<VectorBatchType[]>
        ) => {
            return Object.assign({}, state, {
                batches: action.payload
            });
        },

        add: (
            state: VectorBatchInterface,
            action: PayloadAction<VectorBatchType>
        ) => {
            const batches = duplicator<VectorBatchInterface['batches']>(state.batches)
            batches.push(action.payload)
            return Object.assign({}, state, { batches })
        },
        reset: () => {
            return initialState;
        },

    }
});

export default slice.reducer
