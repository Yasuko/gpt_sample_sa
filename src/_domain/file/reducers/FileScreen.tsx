import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface FileScreenPropsInterface {
    FileScreen?: FileScreenInterface
    dispatch?: Dispatch
}
export type FileScreenInterface = {
    show: boolean,
    target: 'show' | 'none'
}
export const initialState: FileScreenInterface = {
    show: false,
    target: 'none'
}

const slice = createSlice({
    name: 'FileScreen',
    initialState,
    reducers: {
        set: (
            state: FileScreenInterface,
            action: PayloadAction<FileScreenInterface>
        ) => {
            return Object.assign({}, initialState, action.payload)
        },
        reset: () => {
            return initialState
        },
    }
})

export default slice.reducer
