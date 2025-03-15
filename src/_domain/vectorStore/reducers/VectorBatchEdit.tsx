import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
    VectorBatchFormType, initialVectorBatchForm
} from './__type.vectorStore'

export interface VectorBatchEditPropsInterface {
    VectorBatchEdit?: VectorBatchEditInterface
    dispatch?: Dispatch
}
export type VectorBatchEditInterface = VectorBatchFormType & {
    update: boolean,
    validate: boolean,
}

export const initialState: VectorBatchEditInterface = {
    ...initialVectorBatchForm,
    ...{
        update: false,
        validate: false,
    }
}


const slice = createSlice({
    name: 'VectorBatchEdit',
    initialState,
    reducers: {
        set: (
            state: VectorBatchEditInterface,
            action: PayloadAction<VectorBatchFormType>
        ) => {
            return Object.assign({}, initialState, action.payload)
        },
        update: (
            state: VectorBatchEditInterface,
            action: PayloadAction<Partial<VectorBatchEditInterface>>
        ) => {
            return Object.assign({}, state, action.payload);
        },
        reset: () => {
            return initialState;
        },
    }
});

export default slice.reducer
