import { ChatContentType } from '../../../_lib/gpt/_helper/chat.helper'
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
    content : ChatContentType,
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
    newChat     : string        // 新規チャットメッセージ
    images      : string[]      // 画像のURL
    chatBlock   : [Chat]        // Chat全体を保持する
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
        model       : 'gpt-4o',
        messages    : [{
            role    : 'user',
            content : ''
        }],
        temperature : 1,
        top_p       : 1,
        n           : 1,
        stream      : false,
        max_tokens  : 4000,
        presence_penalty: 0,
        frequency_penalty: 0,
    },
    newChat     : '',
    images      : [],
    chatBlock   : [{
        role    : 'user',
        content : {
            type: 'text',
            text: ''
        }
    }],
    saveBlock   : {
        '': [{
            role    : 'user',
            content : {
                type: 'text',
                text: ''
            }
        }]
    },
    chatStack   : ''
}
