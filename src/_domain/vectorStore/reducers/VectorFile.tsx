import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { duplicator } from '../../_helper/object.helper'
import {
    VectorFileFormType
} from './__type.vectorStore'

export interface VectorFilePropsInterface {
    VectorFiles?: VectorFileInterface
    dispatch?: Dispatch
}
export type VectorFileInterface = {
    files: VectorFileFormType[],
}
export const initialState: VectorFileInterface = {
    files: []
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

        reset: () => {
            return initialState;
        },

    }
});

export default slice.reducer
