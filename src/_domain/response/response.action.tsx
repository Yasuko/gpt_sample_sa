import { put, select, takeEvery } from 'redux-saga/effects'

// import animation
import { loadingShow, loadingHide } from '../animation/animation'

// import model
import { ResponseModel } from '../_model/response.model'


// import reducer
import {
    ResponseFormInterface, ResponseFormPropsInterface,
    initialState
} from './reducers/ResponseForm'
import {
    TokenFormPropsInterface
} from '../token/reducers/TokenForm'

// import helper
import { FileHelper } from './helper/file.helper'
import { ResponseHelper } from './helper/response.helper'
import { convertResponseFormToHistory } from './helper/change_storetype.helper'


const Token = (state: TokenFormPropsInterface) => state.TokenForm
const responseForm = (state: ResponseFormPropsInterface) => state.ResponseForm

// Root Saga登録配列
export const RootResponseAction = [
    takeEvery('ResponseAction/send', send), // Responseを送信する
    
    takeEvery('ResponseAction/dragStart', dragStart),
    takeEvery('ResponseAction/dragEnd', dragEnd),
]

/**
 * Responseを送信するSaga関数。
 * ResponseFormの状態を取得し、APIを呼び出して結果を処理します。
 */
function* send(): any {
    yield loadingShow('Now 呼び出してるねん Now');

    const rf: ResponseFormInterface = yield select(responseForm);
    const token = yield select(Token);

    ResponseHelper.call().setAPIKey(token.token || '').setup();
    ResponseHelper.call().setTalk(rf);

    const res = yield ResponseHelper.call().getResult();
    console.log(res);
    if ('error' in res) {
        console.error(res.error);
        alert('Error: ' + res.error.message);
        yield loadingHide();
    }
    yield put({
        type    : 'ResponseHistory/add',
        payload : convertResponseFormToHistory(rf),
    });
    yield put({
        type    : 'ResponseHistory/add',
        payload : res,
    });
    yield put({
        type    : 'ResponseForm/reset',
    });
    yield loadingHide();
}


/**
 * ドラッグ開始時の処理を行うSaga関数。
 */
function* dragStart(): any {}

/**
 * ドラッグ終了時の処理を行うSaga関数。
 *
 * @param val - ドラッグイベントの情報。
 */
function* dragEnd(val: any): any {
    yield FileHelper.call().dragEnd(val.event);
    const f = FileHelper.call().getDataFile();
    const i = FileHelper.call().getImages();
    const a = FileHelper.call().getAudios();
    console.log(f);
    console.log(i);
    console.log(a);
    const payload: any = {};
    if (i && i.length > 0) payload.image = i;
    if (f && f.length > 0) payload.file = f;
    if (a && a.length > 0) payload.audio = a;

    yield put({
        type    : 'ResponseForm/add',
        payload : payload,
    });
}
