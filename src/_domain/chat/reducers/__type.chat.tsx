import { ChatMessagesType, UserMessageType } from '../../../_lib/gpt/_helper/chat.helper'
import {
    ChatOptions
} from '../../../_lib/gpt/type.service'

/**
 * チャットの型
 * ChatMessagesTypeを基にした型定義。
 */
export type Chat = ChatMessagesType

/**
 * ユーザーメッセージの型
 * UserMessageTypeを基にした型定義。
 */
export type UserMessage = UserMessageType

/**
 * ChatReducerの型
 * 各プロパティはチャットフォームの状態を表します。
 *
 * @property options - チャットオプション。
 * @property newChat - 新しいユーザーメッセージ。
 * @property chatBlock - チャット全体のブロック。
 * @property chatScreen - チャット画面の表示状態。
 */
export type ChatFormType = {
    options     : ChatOptions
    newChat     : UserMessageType
    chatBlock   : [Chat]
    chatScreen  : boolean
}

/**
 * ChatFormの初期値
 * 各プロパティにデフォルト値を設定します。
 *
 * @property options - デフォルトのチャットオプション。
 * @property newChat - 空のユーザーメッセージ。
 * @property chatBlock - 初期のチャットブロック。
 * @property chatScreen - 初期状態は非表示。
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
