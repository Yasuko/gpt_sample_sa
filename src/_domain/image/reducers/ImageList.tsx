import { createSlice } from '@reduxjs/toolkit';
import { duplicator, addArray } from '../../_helper/object.helper'
import { ImageListType, ImageListInitialState } from './__type.image'

export interface ImageListPropsInterface {
    ImageList?: ImageListInterface
    dispatch?: any
}

export type ImageListInterface = ImageListType
export const initialState: ImageListInterface = ImageListInitialState

const slice = createSlice({
    name: 'ImageList',
    initialState,
    reducers: {
        setImages: (state: any, action: any) => {
            return Object.assign({}, state, {
                images: action.images
            });
        },
        addImages: (state: any, action: any) => {
            const cb = duplicator(state.images)
            return Object.assign({}, state, {
                images: addArray(cb, action.images, initialState.images)
            });
        },
        deleteImages: (state: any, action: any) => {
            const cb = duplicator(state.images)
            cb.splice(action.key, 1)
            return Object.assign({}, state, {
                images: cb
            });
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;
