import { createSlice } from '@reduxjs/toolkit'
import { ImageScreenType, ImageScreenInitialState } from './__type.image'

export interface ImageScreenPropsInterface {
    ImageScreen?: ImageScreenInterface
    dispatch?   : any
}

export type ImageScreenInterface = ImageScreenType
export const initialState: ImageScreenInterface = ImageScreenInitialState

const slice = createSlice({
    name: 'ImageScreen',
    initialState,
    reducers: {
        showBase: (state: any, action: any) => {
            return Object.assign({}, state, {
                base    : true,
                edit    : false,
                change  : false
            })
        },
        showEdit: (state: any, action: any) => {
            return Object.assign({}, state, {
                base    : false,
                edit    : true,
                change  : false
            })
        },
        showChange: (state: any, action: any) => {
            return Object.assign({}, state, {
                base    : false,
                edit    : false,
                change  : true
            })
        },
        setSubScreen: (state: any, action: any) => {
            return Object.assign({}, state, {
                subscreen: action.subscreen
            })
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
})

export default slice.reducer
