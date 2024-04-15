import { createSlice } from '@reduxjs/toolkit';
import { ImageType, ImageInitialState } from './__type.image'

export interface ImageOptionPropsInterface {
    ImageOption?: ImageOptionInterface
    dispatch?   : any
}

export type ImageOptionInterface = ImageType
export const initialState: ImageOptionInterface = ImageInitialState

const slice = createSlice({
    name: 'ImageOption',
    initialState,
    reducers: {
        setModel: (state: any, action: any) => {
            return Object.assign({}, state, {
                model: action.model
            });
        },
        setPrompt: (state: any, action: any) => {
            return Object.assign({}, state, {
                prompt: action.prompt
            });
        },
        setN: (state: any, action: any) => {
            return Object.assign({}, state, {
                n: action.n
            });
        },
        setSize: (state: any, action: any) => {
            return Object.assign({}, state, {
                size: action.size
            });
        },
        setResponseFormat: (state: any, action: any) => {
            return Object.assign({}, state, {
                responseFormat: action.responseFormat
            });
        },
        setStyle: (state: any, action: any) => {
            return Object.assign({}, state, {
                style: action.style
            });
        },
        setQuality: (state: any, action: any) => {
            return Object.assign({}, state, {
                quality: action.quality
            });
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;
