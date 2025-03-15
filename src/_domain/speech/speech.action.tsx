import { put, select, takeEvery } from 'redux-saga/effects'

// import model
import { SpeechModel } from '../_model/speech.model'

// import animation
import { loadingShow, loadingHide } from '../animation/animation'
// import Helper
import { AudioVisualHelper } from '../_helper/AudioVisual.helper'

// reducer
import {
    SpeechFormInterface, SpeechFormPropsInterface,
} from './reducers/SpeechForm'
import {
    TokenFormPropsInterface
} from '../token/reducers/TokenForm'

const Token = (state: TokenFormPropsInterface) => state.TokenForm
const speechForm = (state: SpeechFormPropsInterface) => state.SpeechForm

// Root Saga登録配列
export const RootSpeechAction = [
    takeEvery('SpeechAction/sendSpeech', sendSpeech),
    takeEvery('SpeechAction/playSpeech', playSpeech),
]

/**
 * サーバーにスピーチメッセージを送信し、レスポンスを処理します。
 * スピーチフォームとトークンをステートから取得し、SpeechModelを呼び出してレスポンスの音声を再生します。
 *
 * @param val any スピーチアクションの入力値。
 * @returns any スピーチアクションの結果。
 */
function* sendSpeech(val: any): any {
    yield loadingShow('Now 呼び出してるねん Now')

    const cf: SpeechFormInterface = yield select(speechForm)
    const token = yield select(Token)

    const r = yield SpeechModel.call(token.token)
                        .callSpeech(cf.message, cf)

    console.info('return response', r)
    yield loadingHide()
    if (!r) return

    yield AudioVisualHelper.call().play(r)

    yield put({
        type        : 'SpeechForm/setResult',
        result      : r,
        text        : cf.message,
    })
}

/**
 * 指定されたスピーチ音声を再生します。
 *
 * @param val any 再生する音声を含む入力値。
 * @returns any 再生アクションの結果。
 */
function* playSpeech(val: any): any {
    yield AudioVisualHelper.call().play(val.audio)
}
