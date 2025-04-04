import { put, select, takeEvery } from 'redux-saga/effects'

// import helper
import { AudioVisualHelper } from './helper/AudioVisual.helper'

import { loadingShow, loadingHide } from '../animation/animation'

// import reducer
import {
    WhisperFormPropsInterface,
} from './reducers/WhisperForm'

import { duplicator, updateArray } from '../_helper/object.helper'
import { EncodeHelper } from './helper/encode.helper'

const WhisperForm = (state: WhisperFormPropsInterface) => state.WhisperForm

// Root Saga登録配列
export const RootAudioAction = [
    // 録音開始
    takeEvery('AudioAction/recorder', recorder),
    // 録音ファイルを削除
    takeEvery('AudioAction/delRecorder', delRecorder),
    // 録音終了
    takeEvery('AudioAction/doneRecorder', doneRecorder),
    // 録音ファイルをエンコード
    takeEvery('AudioAction/encode', encode),
    // 録音ファイルを分割
    takeEvery('AudioAction/split', split),
    // 録音ファイルをダウンロード
    takeEvery('AudioAction/download', download),
];

/**
 * 録音開始
 * AudioVisualHelperを使用して録音を開始し、録音フラグを設定します。
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
 * 録音を停止し、録音データをWhisperFormに追加します。
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
 * 指定されたキーの録音データを削除します。
 *
 * @param val any 削除対象のキーを含むオブジェクト
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
 * オーディオデータのダウンロード
 * 指定された録音データをダウンロードします。
 *
 * @param val any ダウンロード対象のデータ
 */
export function* download(val: any): any
{
    EncodeHelper.call().download(val.file.rec, val.file.extension, val.file.name)
}

/**
 * コーデック変換
 * 録音データを指定された形式に変換し、録音ファイル一覧を更新します。
 *
 * @param val any 変換対象のデータ
 */
export function* encode(val: any): any
{
    // ローディング表示
    yield loadingShow('Now 変換してるねん Now')
    // 録音ファイル取得
    const recorders = yield select(WhisperForm)
    // エンコード
    yield EncodeHelper.call().setup(val.file.rec, val.file.name)
    yield EncodeHelper.call().toMp3(val.extension)
    const result = yield EncodeHelper.call().getResult()
    // 録音ファイル一覧の内容を更新
    const _reducers =
        updateArray(
            recorders.recorder,
            val.key,
            {
                rec         : result.data,
                time        : val.file.time,
                name        : result.name,
                text        : recorders.recorder[val.key].text,
                formation   : recorders.recorder[val.key].formation,
                summary     : recorders.recorder[val.key].summary,
                extension   : 'mp3',
            }
        );
    // 録音ファイル一覧を更新
    yield put({
        type        : 'WhisperForm/setRecorder',
        recorder    : _reducers
    })
    // ローディング非表示
    yield loadingHide()
}

/**
 * 音ファイルの分割
 * 録音データを分割し、録音ファイル一覧を更新します。
 *
 * @param val any 分割対象のデータ
 */
export function* split(val: any): any
{
    // ローディング表示
    yield loadingShow('Now ファイル分割中 Now')

    // 録音ファイルを分割
    yield EncodeHelper.call().setup(val.file.rec, val.file.name)
    const split = yield EncodeHelper.call().split(val.file.time)
    // 録音ファイル一覧を更新
    yield put({
        type        : 'WhisperForm/setRecorder',
        recorder    : split
    })
    // ローディング非表示
    yield loadingHide()
}

/**
 * 音声再生
 * AudioVisualHelperを使用して音声を再生します。
 */
export function* Sound(): any
{
    yield AudioVisualHelper.call().setupSound()
    yield AudioVisualHelper.call().playSound()
}

