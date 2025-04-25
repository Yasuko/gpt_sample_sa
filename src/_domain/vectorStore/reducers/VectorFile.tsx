import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { duplicator } from '../../_helper/object.helper'
import {
    VectorFileFormType
} from './__type.vectorStore'

export interface VectorFilePropsInterface {
    VectorFile?: VectorFileInterface
    dispatch?: Dispatch
}
export type VectorFileInterface = {
    files: VectorFileFormType[],
    store_id: string
}
export const initialState: VectorFileInterface = {
    files: [],
    store_id: ''
}

/**
 * ChatFormの状態管理を行うスライス。
 * 各リデューサーでChatFormの状態を操作します。
 */
const slice = createSlice({
    name: 'VectorFile',
    initialState,
    reducers: {
        set: (
            state: VectorFileInterface,
            action: PayloadAction<VectorFileFormType[]>
        ) => {
            return Object.assign({}, state, {
                files: action.payload
            })
        },
        add: (
            state: VectorFileInterface,
            action: PayloadAction<VectorFileFormType>
        ) => {
            const files = duplicator<VectorFileInterface['files']>(state.files)
            files.push(action.payload);
            return Object.assign({}, state, {
                files: files
            })
        },

        storeID: (
            state: VectorFileInterface,
            action: PayloadAction<string>
        ) => {
            return Object.assign({}, state, {
                store_id: action.payload
            })
        },
        reset: () => {
            return initialState;
        },

    }
});

export default slice.reducer
