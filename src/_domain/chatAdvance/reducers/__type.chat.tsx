import { ChatMessagesType } from '../../../_lib/gpt/_helper/chat.helper'
import {
    ChatOptions
} from '../../../_lib/gpt/type.service'

/**
 * チャットの型
 * @param role    : 'user' | 'system' | 'assistant'
 * @param content : string
 * 
 */
export type Chat = ChatMessagesType

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
        messages    : [],
        temperature : 1,
        top_p       : 1,
        n           : 1,
        stream      : false,
        max_completion_tokens: 4000,
        presence_penalty: 0,
        frequency_penalty: 0,
    },
    newChat     : '',
    images      : [],
    chatBlock   : [{
        role    : 'developer',
        content : '',
        name: ''
    }],
    saveBlock   : {
        '': [{
            role    : 'developer',
            content : '',
            name: ''
        }]
    },
    chatStack   : ''
}
