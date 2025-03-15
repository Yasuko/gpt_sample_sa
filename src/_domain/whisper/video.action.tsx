import { put, select, takeEvery } from 'redux-saga/effects';

// import helper
import { AudioVisualHelper } from './helper/AudioVisual.helper';
import { VideoHelper } from './helper/video.helper';

// import reducer
import {
    WhisperFormPropsInterface,
    WhisperFormInterface,
} from './reducers/WhisperForm';

import { EncodeHelper } from './helper/encode.helper';

const WhisperForm = (state: WhisperFormPropsInterface) => state.WhisperForm;

// Root Saga登録配列
export const RootVideoAction = [
    // フック
    takeEvery('VideoAction/hook', hook),
    // 録画開始
    takeEvery('VideoAction/camera', camera),
    // 録画終了
    takeEvery('VideoAction/doneCamera', doneCamera),
    // 録画を保存
    takeEvery('VideoAction/setMove', setMove),
    // 変換試験
    takeEvery('VideoAction/encodeTest', encodeTest),
];

/**
 * Video Hook受け口
 * 指定されたタスクとデータをディスパッチします。
 *
 * @param val any タスクとデータを含むオブジェクト
 */
export function* hook(val: any): any {
    yield put({
        type        : val.task,
        data        : val.data,
    })
}

/**
 * 録画開始
 * 録画フラグを設定し、VideoHelperを使用して録画を開始します。
 *
 * @param val any 録画に必要なデータ
 * @returns any
 */
export function* camera(val: any): any {
    yield put({
        type        : 'WhisperForm/setVideoFlag',
        recVideo    : true,
    })

    yield VideoHelper.call()
                .setTask('VideoAction/setMove')
                .setup()
    yield VideoHelper.call().start()
}

/**
 * 録画終了処理
 * 録画を停止し、録画データを取得します。
 *
 * @param val any 録画終了に必要なデータ
 */
export function* doneCamera(val: any): any {
    yield VideoHelper.call().stop()
    const cams = yield VideoHelper.call().getMoves()

    yield put({
        type        : 'WhisperForm/setVideoFlag',
        recVideo    : false,
    })
}

/**
 * 録画データを保存
 * 録画データをWhisperFormに追加します。
 *
 * @param val any 録画データ
 */
export function* setMove(val: any): any {
    yield put({
        type        : 'WhisperForm/addRecorder',
        recorder    : {
            rec         : val.data.move,
            time        : val.data.time,
            name        : val.data.name + '.' + val.data.extension,
            text        : '',
            formation   : '',
            summary     : '',
            extension   : val.data.extension,
        }
    });
}

/**
 * 録画データの変換試験
 * 録画データをエンコードし、結果をWhisperFormに追加します。
 *
 * @param val any 録画データ
 */
export function* encodeTest(val: any): any {
    const wf: WhisperFormInterface = yield select(WhisperForm);
    yield EncodeHelper.call()
            .setup(val.file.rec, val.file.name)
    yield EncodeHelper.call()
            .separateAudio(val.file.extension)
    const result = yield EncodeHelper.call().getResult();
    
    yield put({
        type        : 'WhisperForm/addRecorder',
        recorder    : {
            rec         : result.data,
            time        : val.file.time,
            name        : result.name,
            text        : '',
            formation   : '',
            summary     : '',
            extension   : result.name.split('.')[1]
        }
    });
}

/**
 * 音声のセットアップと再生
 * AudioVisualHelperを使用して音声をセットアップし、再生します。
 */
export function* Sound(): any
{
    yield AudioVisualHelper.call().setupSound();
    yield AudioVisualHelper.call().playSound();
}

/**
 * ローディング表示の制御
 * ローディングの表示状態とメッセージを設定します。
 *
 * @param show boolean ローディングを表示するかどうか
 * @param message string ローディングメッセージ（省略可能）
 */
export function* showLoading(show: boolean, message: string = ''): any
{
    yield put({
        type        : 'LoadingAction/showLoading',
        show        : true,
        message     : message
    });
}

