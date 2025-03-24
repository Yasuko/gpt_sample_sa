import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { duplicator } from '../../_helper/object.helper'
import {
    FileType, initialFile
} from './__type.vectorStore'

export interface FilesPropsInterface {
    Files?: FilesInterface
    dispatch?: Dispatch
}
export type FilesInterface = {
    files: FileType[],
}
export const initialState: FilesInterface = {
    files: []
}

/**
 * ChatFormの状態管理を行うスライス。
 * 各リデューサーでChatFormの状態を操作します。
 */
const slice = createSlice({
    name: 'Files',
    initialState,
    reducers: {
        set: (
            state: FilesInterface,
            action: PayloadAction<FileType[]>
        ) => {
            return Object.assign({}, state, {
                files: action.payload
            })
        },

        add: (
            state: FilesInterface,
            action: PayloadAction<FileType>
        ) => {
            const files = duplicator<FilesInterface['files']>(state.files)
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
