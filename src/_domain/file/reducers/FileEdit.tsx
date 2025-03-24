import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
    FileFormType, initialFileForm
} from './__type.vectorStore'

export interface FileEditPropsInterface {
    FileEdit?: FileEditInterface
    dispatch?: Dispatch
}
export type FileEditInterface = FileFormType & {
    update: boolean,
    validate: boolean,
}

export const initialState: FileEditInterface = {
    ...initialFileForm,
    ...{
        update: false,
        validate: false,
    }
}


const slice = createSlice({
    name: 'FileEdit',
    initialState,
    reducers: {
        set: (
            state: FileEditInterface,
            action: PayloadAction<FileFormType>
        ) => {
            return Object.assign({}, initialState, action.payload)
        },
        update: (
            state: FileEditInterface,
            action: PayloadAction<Partial<FileEditInterface>>
        ) => {
            return Object.assign({}, state, action.payload);
        },
        reset: () => {
            return initialState;
        },
    }
});

export default slice.reducer
