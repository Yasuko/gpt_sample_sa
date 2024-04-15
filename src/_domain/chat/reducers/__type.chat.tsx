import {
    ChatOptions
} from '../../../_lib/gpt/type.service'

/**
 * チャットの型
 * @param role    : 'user' | 'system' | 'assistant'
 * @param content : string
 * 
 */
export type Chat = {
    role    : 'user' | 'system' | 'assistant',
    content : string,
}

/**
 * ChatReducerの型
 * @param options   : ChatOptions
 * @param newChat   : string
 * @param chatBlock : [Chat]
 * @param saveBlock : { [key: string]: [Chat] }
 * @param chatStack : string
 * 
 */
export type ChatFormType = {
    options     : ChatOptions
    newChat     : string
    chatBlock   : [Chat]
    saveBlock   : {
        [key: string]: [Chat]
    }
    chatStack   : string
}

/**
 * ChatFormの初期値
 * @param options   : ChatOptions
 * @param newChat   : string
 * @param chatBlock : [Chat]
 * @param saveBlock : { [key: string]: [Chat] }
 * @param chatStack : string
 */
export const initialChatForm: ChatFormType = {
    options     : {
        model       : 'gpt-3.5-turbo',
        messages    : [{
            role    : 'user',
            content : 'これから質問をするので、5才児にも伝わる内容で回答を考えて'
        }],
        temperature : 1,
        top_p       : 1,
        n           : 1,
        stream      : false,
        max_tokens  : 1000,
        presence_penalty: 0,
        frequency_penalty: 0,
    },
    newChat     : '',
    chatBlock   : [{
        role    : 'user',
        content : ''
    }],
    saveBlock   : {
        '': [{
            role    : 'user',
            content : ''
        }]
    },
    chatStack   : ''
};
