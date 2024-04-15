import { createSlice } from '@reduxjs/toolkit';
import { ImageChangeType, ImageChangeInitialState } from './__type.image'

export interface ImageChangeOptionPropsInterface {
    ImageChangeOption?: ImageChangeOptionInterface
    dispatch?   : any
}

export type ImageChangeOptionInterface = ImageChangeType
export const initialState: ImageChangeOptionInterface = ImageChangeInitialState

const slice = createSlice({
    name: 'ImageChangeOption',
    initialState,
    reducers: {
        setImage: (state: any, action: any) => {
            return Object.assign({}, state, {
                image: action.image
            })
        },
        setModel: (state: any, action: any) => {
            return Object.assign({}, state, {
                prompt: action.prompt
            })
        },
        setN: (state: any, action: any) => {
            return Object.assign({}, state, {
                n: action.n
            })
        },
        setSize: (state: any, action: any) => {
            return Object.assign({}, state, {
                size: action.size
            })
        },
        setResponseFormat: (state: any, action: any) => {
            return Object.assign({}, state, {
                responseFormat: action.responseFormat
            })
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer
