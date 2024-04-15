import { put, select, takeEvery } from 'redux-saga/effects'

// import model
import { VisionModel } from '../_model/vision.model'

// import animation
import { loadingShow, loadingHide } from '../animation/animation'
// import Helper
import { buildOptions } from './helper/vision.helper'
import { FileHelper } from './helper/file.helper'

// reducer
import {
    VisionFormInterface, VisionFormPropsInterface,
} from './reducers/VisionForm'
import {
    TokenFormPropsInterface
} from '../token/reducers/TokenForm'

const Token = (state: TokenFormPropsInterface) => state.TokenForm
const visionForm = (state: VisionFormPropsInterface) => state.VisionForm;

// Root Saga登録配列
export const RootVisionAction = [
    takeEvery('VisionAction/sendVision', sendVision),
    takeEvery('VisionAction/dragStart', dragStart),
    takeEvery('VisionAction/dragEnd', dragEnd),
];

/**
 * Chatを送信する
 * @param val 
 */
function* sendVision(val: any): any {
    yield loadingShow('Now 呼び出してるねん Now')

    const cf: VisionFormInterface = yield select(visionForm)
    const token = yield select(Token)

    // ChatBlockに送信したメッセージを追加
    yield put({
        type        : 'VisionForm/addMessage',
        message   : {
            role    : 'user',
            message : val.message,
        }
    })

    const r = yield VisionModel.call(token.token)
                .question(cf.image, cf.message, buildOptions(cf))
    
    console.log(r)

    yield put({
        type        : 'VisionForm/setResult',
        result      : r.message.content,
    })

    yield loadingHide()
}

function* dragStart(val: any): any {}

function* dragEnd(val: any): any {
    yield FileHelper.call().dragEnd(val.event)
    const f = FileHelper.call().getDataFile()
    console.log(f)
    
    // ChatAPIのコール要求をサーバーに送信
    yield put({
        type    : 'VisionForm/setImage',
        image   : f.image
    })
}