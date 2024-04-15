import {
    CompletionOptions
} from '../../../_lib/gpt/type.service'

/**
 * チャットの型
 * @param role    : 'user' | 'system' | 'assistant' | 'null'
 * @param message : string
 * 
 */
export type Comp = {
    role    : 'user' | 'system' | 'assistant' | 'null',
    message : string,
}

/**
 * ChatReducerの型
 * @param options   : CompletionOptions
 * @param prompt    : string
 * @param result    : string
 * @param save      : { [key: string]: [Chat] }
 * 
 */
export type CompFormType = {
    options     : CompletionOptions
    prompt      : string
    result      : string
    save        : [{
        prompt  : string,
        result  : string
    }]
}

/**
 * CompFormの初期値
 * @param options   : CompletionOptions
 * @param options.model     : 'text-davinci-003'
 * @param options.prompt    : ''
 * @param options.max_tokens  : 1000,
 * @param options.temperature : 1,
 * @param options.top_p       : 1,
 * @param options.n           : 1,
 * @param options.presence_penalty: 0,
 * @param options.frequency_penalty: 0,
 * @param options.best_of     : 1,
 * @param prompt    : string
 * @param result    : string
 * @param save      : { [key: string]: [Chat] }
 */
export const initialCompForm: CompFormType = {
    options     : {
        model     : 'text-davinci-003',
        prompt    : '',
        max_tokens  : 1000,
        temperature : 1,
        top_p       : 1,
        n           : 1,
        presence_penalty: 0,
        frequency_penalty: 0,
        best_of     : 1,
    },
    prompt     : '',
    result     : '',
    save       : [{
        prompt    : '',
        result    : ''
    }]
};
