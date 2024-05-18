import { put, select, takeEvery } from 'redux-saga/effects'

// import animation
import { loadingShow, loadingHide } from '../animation/animation'

// import model
import { ChatModel } from '../_model/chat.model'

// import reducer
import {
    ChatFormInterface, ChatFormPropsInterface,
    initialState
} from './reducers/ChatForm'
import { consistent } from '../_helper/object.helper'
import {
    TokenFormPropsInterface
} from '../token/reducers/TokenForm'

// import helper
import { FileHelper } from './helper/file.helper'
import { ChatHelper } from './helper/chat.helper'

const Token = (state: TokenFormPropsInterface) => state.TokenForm
const chatForm = (state: ChatFormPropsInterface) => state.ChatForm

// Root Saga登録配列
export const RootChatAction = [
    takeEvery('ChatAction/sendChat', sendChat), // Chatを送信する
    takeEvery('ChatAction/exportChat', exportChat), // Chatを外部アクションから呼び出す
    takeEvery('ChatAction/dragStart', dragStart),
    takeEvery('ChatAction/dragEnd', dragEnd),
]

/**
 * Chatを送信する
 */
function* sendChat(): any {
    yield loadingShow('Now 呼び出してるねん Now')

    const cf: ChatFormInterface = yield select(chatForm)
    const token = yield select(Token)
    const block = consistent(cf.chatBlock, initialState.chatBlock)
                    ? undefined
                    : cf.chatBlock
    const content = ChatHelper.call()
                        .buildSendContents(cf.newChat, cf.images)

    // ChatBlockに送信したメッセージを追加
    yield put({
        type        : 'ChatForm/addChatBlock',
        chatBlock   : {
            role    : 'user',
            content : {
                type: 'text',
                text: cf.newChat
            }
        }
    })

    // ChatAPIをコール
    const r = yield ChatModel.call(token.token)
                .callDocumetSummary(content, block, cf.options)

    // messagesに格納された全てのメッセージをChatBlockに追加
    yield put({
        type        : 'ChatForm/addChatBlock',
        chatBlock   : {
            role    : r.choices[0].message.role,
            content : {
                type: 'text',
                text: r.choices[0].message.content
            },
        }
    })

    yield put({
        type        : 'ChatForm/setChatStack',
        chatStack   : ''
    })

    yield loadingHide()
}

/**
 * Chat機能を外部アクションから呼び出したい時に使う
 * @param val 
 */
function* exportChat(val: any): any {
    const cf: ChatFormInterface = yield select(chatForm)
    const token = yield select(Token)

    // ChatAPIをコール
    const r = yield ChatModel.call(token.token)
        .callDocumetSummary(val.chat, undefined, cf.options)
    yield put({
        type    : val.dispatch,
        role    : r.choices[0].message.role,
        content : r.choices[0].message.content,
    })
}


function* dragStart(): any {}

function* dragEnd(val: any): any {
    yield FileHelper.call().dragEnd(val.event)
    const f = FileHelper.call().getDataFile()
    console.log(f)
    
    // ChatAPIのコール要求をサーバーに送信
    yield put({
        type    : 'ChatForm/addImage',
        image   : f.image
    })
    yield put({
        type        : 'ChatForm/addChatBlock',
        chatBlock   : {
            role    : 'user',
            content : {
                type: 'image_url',
                image_url: {
                    url: f.image
                },
            }
        }
    })
}