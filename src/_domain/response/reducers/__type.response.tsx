import {
    CreateModelResponseType
} from '../../../_lib/gpt/_helper/response.input.type'
import {
    ResponseReturnType
} from '../../../_lib/gpt/_helper/response.output.type'



export type ResponseFormType = {
    role: 'user'
    text: string,
    image: {
        image: string,
        date: number,
        name: string,
        type: 'png' | 'jpg' | 'jpeg' | 'webp',
        size: number,
    }[],
    file: {
        data: string,
        date: number,
        name: string,
        type: 'pdf' | 'txt' | 'md' | 'csv' | 'json',
        size: number,
    }[],
    audio: {
        data: string,
        date: number,
        name: string,
        type: 'mp3' | 'wav',
        size: number,
    }[],
}

export const initialResponseForm: ResponseFormType = {
    role: 'user',
    text: '',
    image: [],
    file: [],
    audio: [],
}

export type ResponseHistoryType = {
    role: 'system' | 'user' | 'assistant' | 'tool',
    text?: string,
    image?: {
        image: string,
        date: number,
        type: 'png' | 'jpg' | 'jpeg' | 'webp',
        name: string,
        size: number,
    },
    file?: {
        data: string,
        date: number,
        type: 'pdf' | 'txt' | 'md' | 'csv' | 'json',
        name: string,
        size: number,
    },
    audio?: {
        data: string,
        date: number,
        type: 'mp3' | 'wav' | 'ogg' | 'm4a' | 'aac',
        name: string,
        size: number,
    }
}

export type ResponseHistoryObjectType = {
    historys: ResponseHistoryType[]
}

export type ResponseOutputType = ResponseReturnType['output']

export const initialResponseHistory: ResponseHistoryObjectType = {
    historys: []
}

export type ResponseAPIType = CreateModelResponseType

export const initialResponseAPI: ResponseAPIType = {
    model: 'gpt-5-nano',
    input: '',
}