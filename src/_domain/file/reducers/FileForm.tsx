import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { duplicator, addArray } from '../../_helper/object.helper'
import {
    FileFormType, initialFileForm
} from './__type.vectorStore'

export interface FileFormPropsInterface {
    FileForm?: FileFormInterface
    dispatch?: Dispatch
}
export interface FileDetails {
    data: string
    name: string
    type: string
    size: number
    date: number
}

export type FileFormInterface = {
    files: (FileFormType & FileDetails)[]
}

export const initialState: FileFormInterface = {
    files: []
}

const slice = createSlice({
    name: 'FileForm',
    initialState,
    reducers: {
        add: (
            state: FileFormInterface,
            action: PayloadAction<FileFormType>
        ) => {
            const files = duplicator<FileFormType[]>(state.files)
            files.push(action.payload)
            return Object.assign({}, state, {
                files: files
            })
        },
        update: (
            state: FileFormInterface,
            action: PayloadAction<Partial<FileFormType>>
        ) => {
            return Object.assign({}, state, action.payload)
        },
        remove: (
            state: FileFormInterface,
            action: PayloadAction<number>
        ) => {
            const files = duplicator<FileFormType[]>(state.files)
            files.splice(action.payload, 1)
            return Object.assign({}, state, {
                files: files
            })
        },
        reset: () => {
            return initialState
        },
    }
});

export default slice.reducer
