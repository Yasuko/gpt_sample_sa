import { ChatMessagesType, UserMessageType } from '../../../_lib/gpt/_helper/chat.helper'
import {
    ChatOptions
} from '../../../_lib/gpt/type.service'

/**
 * チャットの型
 */
export type Chat = ChatMessagesType

export type UserMessage = UserMessageType

/**
 * ChatReducerの型
 * @param options   : ChatOptions
 * @param newChat   : string
 * @param chatBlock : [Chat]
 * 
 */
export type ChatFormType = {
    options     : ChatOptions
    newChat     : UserMessageType
    chatBlock   : [Chat]        // Chat全体を保持する
    chatScreen  : boolean
}

/**
 * ChatFormの初期値
 * @param options   : ChatOptions
 * @param newChat   : string
 * @param chatBlock : [Chat]
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
    newChat     : {
        role    : 'user',
        content : [{
            type: 'text',
            text: ''
        }],
    },
    chatBlock   : [{
        role    : 'developer',
        content : '',
        name: ''
    }],
    chatScreen  : false
}
