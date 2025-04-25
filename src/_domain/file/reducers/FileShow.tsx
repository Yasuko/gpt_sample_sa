import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
    FileType, initialFile
} from './__type.vectorStore'

export interface FileShowPropsInterface {
    FileShow?: FileShowInterface
    dispatch?: Dispatch
}
export type FileShowInterface = FileType
export const initialState: FileShowInterface = initialFile

const slice = createSlice({
    name: 'FileShow',
    initialState,
    reducers: {
        set: (
            state: FileShowInterface,
            action: PayloadAction<FileShowInterface>
        ) => {
            return Object.assign({}, initialState, action.payload)
        },
        reset: () => {
            return initialState;
        },
    }
});

export default slice.reducer
