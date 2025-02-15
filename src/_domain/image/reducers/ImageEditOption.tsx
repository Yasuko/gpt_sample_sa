import { createSlice } from '@reduxjs/toolkit';
import { ImageEditType, ImageEditInitialState } from './__type.image'

export interface ImageEditOptionPropsInterface {
    ImageEditOption?: ImageEditOptionInterface
    dispatch?   : any
}

export type ImageEditOptionInterface = ImageEditType
export const initialState: ImageEditOptionInterface = ImageEditInitialState

const slice = createSlice({
    name: 'ImageEditOption',
    initialState,
    reducers: {
        setImage: (state: any, action: any) => {
            return Object.assign({}, state, {
                image: action.image
            })
        },
        setImageBase64: (state: any, action: any) => {
            return Object.assign({}, state, {
                image_base64: action.image_base64
            })
        },
        setMask: (state: any, action: any) => {
            return Object.assign({}, state, {
                mask: action.mask
            })
        },
        setMaskBase64: (state: any, action: any) => {
            console.log(action.mask_base64)
            return Object.assign({}, state, {
                mask_base64: action.mask_base64
            })
        },
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
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
})

export default slice.reducer
