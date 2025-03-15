import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
    VectorFileFormType, initialVectorFileForm
} from './__type.vectorStore'

export interface VectorFileEditPropsInterface {
    VectorFileEdit?: VectorFileEditInterface
    dispatch?: Dispatch
}
export type VectorFileEditInterface = VectorFileFormType & {
    update: boolean,
    validate: boolean,
}

export const initialState: VectorFileEditInterface = {
    ...initialVectorFileForm,
    ...{
        update: false,
        validate: false,
    }
}


const slice = createSlice({
    name: 'VectorFileEdit',
    initialState,
    reducers: {
        set: (
            state: VectorFileEditInterface,
            action: PayloadAction<VectorFileFormType>
        ) => {
            return Object.assign({}, initialState, action.payload)
        },
        update: (
            state: VectorFileEditInterface,
            action: PayloadAction<Partial<VectorFileEditInterface>>
        ) => {
            return Object.assign({}, state, action.payload);
        },
        reset: () => {
            return initialState;
        },
    }
});

export default slice.reducer
