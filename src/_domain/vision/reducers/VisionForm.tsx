import { createSlice } from '@reduxjs/toolkit'
import { VisionFormType, initialVisionForm } from './__type.vision'

export interface VisionFormPropsInterface {
    VisionForm?: VisionFormInterface,
    dispatch?: any
}

export type VisionFormInterface = VisionFormType & {
    message: string,
    temperature: number,
    max_tokens: number,
    image: string,
    result: string,
}

export const initialState: VisionFormInterface = {
    ...initialVisionForm,
    message: '',
    temperature: 0.9,
    max_tokens: 1000,
    image: '',
    result: '',
}

const slice = createSlice({
    name: 'VisionForm',
    initialState,
    reducers: {
        setMessage: (state: any, action: any) => {
            return Object.assign({}, state, {
                message: action.message
            })
        },
        setTemperature: (state: any, action: any) => {
            return Object.assign({}, state, {
                temperature: action.temperature
            })
        },
        setMaxTokens: (state: any, action: any) => {
            return Object.assign({}, state, {
                max_tokens: action.max_tokens
            })
        },
        setImage: (state: any, action: any) => {
            return Object.assign({}, state, {
                image: action.image
            })
        },
        setResult: (state: any, action: any) => {
            return Object.assign({}, state, {
                result: action.result
            })
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
})

export default slice.reducer
