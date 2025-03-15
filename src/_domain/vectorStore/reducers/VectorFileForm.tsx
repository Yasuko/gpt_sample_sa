import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
    VectorFileFormType, initialVectorFileForm
} from './__type.vectorStore'

export interface VectorFileFormPropsInterface {
    VectorFileForm?: VectorFileFormType
    dispatch?: Dispatch
}
export type VectorFileFormInterface = VectorFileFormType
export const initialState: VectorFileFormInterface = initialVectorFileForm

const slice = createSlice({
    name: 'VectorFileForm',
    initialState,
    reducers: {
        update: (
            state: VectorFileFormInterface,
            action: PayloadAction<Partial<VectorFileFormType>>
        ) => {
            return Object.assign({}, state, action.payload)
        },
        reset: () => {
            return initialState
        },
    }
});

export default slice.reducer
