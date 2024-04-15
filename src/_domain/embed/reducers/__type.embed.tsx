import {
    EmbedOptions, initialEmbedOptions
} from '../../../_lib/gpt/type.service'

export type DictionaryType = {
    title: string
    document: string
    embed: number[]
}

export type EmbedDictionaryType = {
    docs: DictionaryType[]
}

export const initialEmbedDictionary: EmbedDictionaryType = {
    docs: []
}

/**
 * 
 */
export type EmbedFormType = {
    options     : EmbedOptions
    file        : string
    type        : 'pdf' | 'docx' | 'md' | 'txt'
    name        : string
    input       : string
    result      : number[]
    question    : string
}

/**
 * EmbedFormの初期値
 */
export const initialEmbedForm: EmbedFormType = {
    options     : initialEmbedOptions,
    file        : '',
    type        : 'txt',
    name        : '',
    input       : '',
    result      : [],
    question    : '',
}
