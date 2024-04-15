import { createSlice } from '@reduxjs/toolkit'
import { SpeechFormType, initialSpeechForm } from './__type.speech'
import { duplicator } from '../../_helper/object.helper'

export interface SpeechFormPropsInterface {
    SpeechForm?: SpeechFormInterface,
    dispatch?: any
}

export type SpeechFormInterface = SpeechFormType & {
    message : string,
    response_format: 'mp3' | 'opus' | 'aac' | 'flac',
    speed   : number, // 0.25~4.0, default 1.0
    voice   : 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer'
    results : [{
        audio: string,
        text: string,
    }] | '',
}

export const initialState: SpeechFormInterface = {
    ...initialSpeechForm,
    message         : '',
    response_format : 'mp3',
    speed           : 1.0,
    voice           : 'alloy',
    results         : '',
}

const slice = createSlice({
    name: 'SpeechForm',
    initialState,
    reducers: {
        setMessage: (state: any, action: any) => {
            return Object.assign({}, state, {
                message: action.message
            })
        },
        setResponceFormat: (state: any, action: any) => {
            return Object.assign({}, state, {
                response_format: action.response_format
            })
        },
        setSpeed: (state: any, action: any) => {
            return Object.assign({}, state, {
                speed: action.speed
            })
        },
        setVoice: (state: any, action: any) => {
            return Object.assign({}, state, {
                voice: action.voice
            })
        },
        setResult: (state: any, action: any) => {
            const r = duplicator(state.results)
            console.log(r)
            if (Object.keys(r).length === 0) {
                return Object.assign({}, state, {
                    results: [{
                        audio   : action.result,
                        text    : action.text,
                    }]
                })
            } else {
                r.push({
                    audio   : action.result,
                    text    : action.text,
                })
                return Object.assign({}, state, {
                    results: r
                })
            }

        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
})

export default slice.reducer
