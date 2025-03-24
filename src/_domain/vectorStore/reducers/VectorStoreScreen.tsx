import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface VectorStoreScreenPropsInterface {
    VectorStoreScreen?: VectorStoreScreenInterface
    dispatch?: Dispatch
}
export type VectorStoreScreenInterface = {
    show: boolean,
    target: 'store_form' | 'store_edit' | 'store_detail' | 'store_delete' 
            | 'file_form' | 'file_edit' | 'file_detail' | 'file_delete'
            | 'batch_form' | 'batch_edit' | 'batch_detail' | 'batch_delete'
            | 'none'
}
export const initialState: VectorStoreScreenInterface = {
    show: false,
    target: 'none'
}

const slice = createSlice({
    name: 'VectorStoreScreen',
    initialState,
    reducers: {
        set: (
            state: VectorStoreScreenInterface,
            action: PayloadAction<VectorStoreScreenInterface>
        ) => {
            return Object.assign({}, initialState, action.payload)
        },
        reset: () => {
            return initialState
        },
    }
})

export default slice.reducer
