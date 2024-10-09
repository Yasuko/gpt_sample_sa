import { put, select, takeEvery } from 'redux-saga/effects'

// import animation
import { loadingShow, loadingHide } from '../animation/animation'

// import model
import { ChatModel } from '../_model/chat.model'

// import reducer
import {
    ChatFormInterface, ChatFormPropsInterface,
    initialState
} from './reducers/StreamForm'
import { consistent } from '../_helper/object.helper'
// import helper
import { AudioVisualHelper } from './helper/AudioVisual.helper'
import { EncodeHelper } from './helper/encode.helper'
import {
    TokenFormPropsInterface
} from '../token/reducers/TokenForm'

// import helper
import { FileHelper } from './helper/file.helper'
import { ChatHelper } from './helper/stream,.helper'

const Token = (state: TokenFormPropsInterface) => state.TokenForm
const chatForm = (state: ChatFormPropsInterface) => state.ChatForm

// Root Saga登録配列
export const RootStreamAction = [
    // 録音開始
    takeEvery('AudioAction/recorder', recorder),
    // 録音ファイルを削除
    takeEvery('AudioAction/delRecorder', delRecorder),
    // 録音終了
    takeEvery('AudioAction/doneRecorder', doneRecorder),
    takeEvery('StreamAction/sendChat', sendChat), // Chatを送信する
    takeEvery('StreamAction/dragStart', dragStart),
    takeEvery('StreamAction/dragEnd', dragEnd),
]

/**
 * 録音開始
 */
export function* recorder(): any
{
    yield AudioVisualHelper.call().setup()
    yield AudioVisualHelper.call().start()
    yield put({
        type: 'WhisperForm/setAudioFlag',
        recAudio: true
    })
}

/**
 * 録音終了
 */
export function* doneRecorder(): any {
    yield AudioVisualHelper.call().stop()
    const wav = AudioVisualHelper.call().getWav()
    console.log(wav)
    yield put({
        type        : 'WhisperForm/addRecorder',
        recorder    : {
            rec         : yield EncodeHelper.call().toBase64(wav.rec),
            time        : wav.time,
            name        : wav.name,
            text        : '',
            formation   : '',
            summary     : '',
            extension   : 'wav'
        }
    })

    yield put({
        type: 'WhisperForm/setAudioFlag',
        recAudio: false
    })
}

/**
 * 録音削除
 * @param val 
 */
export function* delRecorder(val: any): any
{
    const recs = yield select(WhisperForm)
    const _rec = duplicator(recs.recorder)
    delete _rec[val.key];
    yield put({
        type        : 'WhisperForm/setRecorder',
        recorder    : _rec
    })
}

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