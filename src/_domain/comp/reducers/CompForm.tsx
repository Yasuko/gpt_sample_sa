import { createSlice } from '@reduxjs/toolkit';
import { duplicator, addArray } from '../../_helper/object.helper'
import { CompFormType, initialCompForm } from './__type.comp'

export interface CompFormPropsInterface {
    CompForm?: CompFormType
    dispatch?: any
}
export type CompFormInterface = CompFormType
export const initialState: CompFormType = initialCompForm

const slice = createSlice({
    name: 'CompForm',
    initialState,
    reducers: {
        setPrompt: (state: any, action: any) => {
            return Object.assign({}, state, {
                prompt: action.prompt
            });
        },
        setResult: (state: any, action: any) => {
            return Object.assign({}, state, {
                result: action.result
            });
        },
        setOptions: (state: any, action: any) => {
            const op = duplicator(state.options)
            if (op.hasOwnProperty(action.key) === false) return state

            op[action.key] = action.option
            return Object.assign({}, state, {
                options: op
            });
        },
        addSave: (state: any, action: any) => {
            const sa = duplicator(state.save)
            const _save = (sa[0].prompt === '')
                            ? [action.save]
                            : addArray(sa, action.save, initialState.save)

            return Object.assign({}, state, {
                save: _save
            });
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;
