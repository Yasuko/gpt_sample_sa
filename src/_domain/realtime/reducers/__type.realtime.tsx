import { ChatContentType } from '../../../_lib/gpt/_helper/chat.helper'


/**
 * チャットの型
 * @param role    : 'user' | 'system' | 'assistant'
 * @param content : string
 * 
 */
export type Stream = {
    role    : 'user' | 'system' | 'assistant',
    content : ChatContentType,
}

export type RealtimeFormType = {
    newChat     : string        // 新規チャットメッセージ
    images      : string[]      // 画像のURL
    chatBlock   : [Stream]        // Chat全体を保持する
    saveBlock   : {
        [key: string]: [Stream]
    }
    chatStack   : string
}

export const initialRealtimeForm: RealtimeFormType = {
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
