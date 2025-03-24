import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
    FileFormType, initialFileForm
} from './__type.vectorStore'

export interface FileFormPropsInterface {
    FileForm?: FileFormType
    dispatch?: Dispatch
}
export type FileFormInterface = FileFormType
export const initialState: FileFormInterface = initialFileForm

const slice = createSlice({
    name: 'FileForm',
    initialState,
    reducers: {
        update: (
            state: FileFormInterface,
            action: PayloadAction<Partial<FileFormType>>
        ) => {
            return Object.assign({}, state, action.payload)
        },
        reset: () => {
            return initialState
        },
    }
});

export default slice.reducer
