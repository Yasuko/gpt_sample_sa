import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
    VectorBatchFormType, VectorBatchType, initialVectorBatchForm
} from './__type.vectorStore'

export interface VectorBatchFormPropsInterface {
    VectorBatchForm?: VectorBatchFormInterface
    dispatch?: Dispatch
}
export type VectorBatchFormInterface = VectorBatchFormType & {
    update: boolean,
    validate: boolean
}
export const initialState: VectorBatchFormInterface = {
    ...initialVectorBatchForm,
    ...{
        update: false,
        validate: false
    }
}

const slice = createSlice({
    name: 'VectorBatchForm',
    initialState,
    reducers: {
        update: (
            state: VectorBatchFormInterface,
            action: PayloadAction<Partial<VectorBatchType>>
        ) => {
            return Object.assign({}, state, action.payload)
        },
        reset: () => {
            return initialState
        },
    }
});

export default slice.reducer
