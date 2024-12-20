import { put, select, takeEvery } from 'redux-saga/effects'

// import model
import { StreamModel } from '../_model/stream.model'

// import reducer
import {
    StreamFormInterface,
    StreamFormPropsInterface,
    initialState
} from './reducers/StreamForm'
import { consistent } from '../_helper/object.helper'
// import helper
import { AudioVisualHelper } from './helper/AudioVisual.helper'
import { EncodeHelper } from './helper/encode.helper'
import {
    TokenFormPropsInterface
} from '../token/reducers/TokenForm'
import { PayloadAction } from '@reduxjs/toolkit'

const Token = (state: TokenFormPropsInterface) => state.TokenForm
const streamForm = (state: StreamFormPropsInterface) => state.StreamForm

// Root Saga登録配列
export const RootStreamAction = [
    // 録音開始
    takeEvery('AudioAction/recorder', recorder),
    // 録音終了
    takeEvery('StreamAction/setCallback', setCallback),
    takeEvery('AudioAction/doneRecorder', doneRecorder),
    takeEvery('StreamAction/sendChat', sendChat),
    takeEvery('StreamAction/returnResponse', returnResponse)
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


function* setCallback(val: any): any {
    const token = yield select(Token)
    console.log(token)
    yield StreamModel.call(token.token).setCallback(val.callback)
}


/**
 * Chatを送信する
 */
function* sendChat(): any {
    const cf: StreamFormInterface = yield select(streamForm)
    const block = consistent(cf.chatBlock, initialState.chatBlock)
                    ? undefined
                    : cf.chatBlock

    StreamModel.call('').call('test')

}

function* returnResponse(val: PayloadAction<any>): any {
    console.log(val)
}