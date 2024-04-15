import { createSlice } from '@reduxjs/toolkit'
import { duplicator } from '../../_helper/object.helper'
import {
    EmbedFormType, initialEmbedForm
} from './__type.embed'

export interface EmbedFormPropsInterface {
    EmbedForm?: EmbedFormType
    dispatch?: any
}
export type EmbedFormInterface = EmbedFormType
export const initialState: EmbedFormType = initialEmbedForm

const slice = createSlice({
    name: 'EmbedForm',
    initialState,
    reducers: {
        setFile: (state: any, action: any) => {
            return Object.assign({}, state, {
                file: action.file
            })
        },
        setType: (state: any, action: any) => {
            return Object.assign({}, state, {
                type: action.fileType
            })
        },
        setInput: (state: any, action: any) => {
            return Object.assign({}, state, {
                input: action.input
            })
        },
        setResult: (state: any, action: any) => {
            return Object.assign({}, state, {
                result: action.result
            })
        },
        setOptions: (state: any, action: any) => {
            const op = duplicator(state.options)
            op[action.key] = action.option
            return Object.assign({}, state, {
                options: op
            });
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
})

export default slice.reducer
