import { put, select, takeEvery } from 'redux-saga/effects'

// import animation
import { loadingShow, loadingHide } from '../animation/animation'

// import model
import { WhisperModel } from '../_model/whisper.model'

// import helper
import { FileHelper } from './helper/file.helper'
import { duplicator } from '../_helper/object.helper'

// import reducer
import {
    WhisperFormPropsInterface,
    WhisperFormInterface,
} from './reducers/WhisperForm'
import {
    TokenFormPropsInterface
} from '../token/reducers/TokenForm'

const Token = (state: TokenFormPropsInterface) => state.TokenForm
const WhisperForm = (state: WhisperFormPropsInterface) => state.WhisperForm

// Root Saga登録配列
export const RootWhisperAction = [
    // Drag開始処理
    takeEvery('WhisperAction/DragStart', dragStart),
    // Drag終了処理
    takeEvery('WhisperAction/DragEnd', dragEnd),
    // 整形後の文書を保存
    takeEvery('WhisperAction/setFormation', setFormation),
    // 予約後の文書を保存
    takeEvery('WhisperAction/setSummary', setSummary),
    // 文書を成形・要約
    takeEvery('WhisperAction/convertText', convertText),

    // 録音ファイルを送信
    takeEvery('WhisperAction/characterization', characterization),
]

/**
 * ドラッグ開始時の処理
 * 現在は未実装。
 *
 * @param val any ドラッグイベントのデータ
 */
export function* dragStart(val: any): any {}

/**
 * ドラッグ終了時の処理
 * ドラッグされたファイルを処理し、録音ファイル一覧に保存します。
 *
 * @param val any ドラッグイベントのデータ
 */
export function* dragEnd(val: any): any {
    yield FileHelper.call().dragEnd(val.event, 'file')
    const f = FileHelper.call().getDataFile()
    console.log(f)
    
    // メディア情報を取得
    const info = yield FileHelper.call().getMediaInfo(f)

    const recorder = {
        rec     : f.data,
        time    : info.duration,
        name    : f.name
    }
    
    const wf = duplicator(yield select(WhisperForm))

    if (wf.recorder.length > 0) wf.recorder = recorder
    else wf.recorder.push(recorder)

    // ドラッグされたファイルを録音ファイル一覧に保存
    yield put({
        type        : 'WhisperForm/setRecorder',
        recorder    : wf.recorder
    })
}

/**
 * 文字起こし文書を整形
 * WhisperFormのデータを基に文書を整形し、ChatActionにエクスポートします。
 *
 * @param val any 文書整形に必要なデータ
 */
export function* convertText(val: any): any {
    yield loadingShow('Now 文書整形中 Now')
    const wf: WhisperFormInterface = yield select(WhisperForm)
    console.log(val.key)
    const spell = (val.job === 'formation')
        ? wf.recorder[val.key].text + wf.spell['formation']
        : wf.recorder[val.key].formation + wf.spell['summary']
    
    const dispatch = (val.job === 'formation')
            ? 'WhisperAction/setFormation'
            : 'WhisperAction/setSummary'

    yield put({
        type        : 'ChatAction/exportChat',
        chat        : spell,
        dispatch    : dispatch,
        task        : val.job,
        key         : val.key,
    })
}

/**
 * WhisperAPIに送信(文字起こし)
 * 録音ファイルをWhisper APIに送信し、結果を取得して保存します。
 *
 * @param val any 録音ファイルデータ
 */
export function* characterization(val: any): any {
    const wf = duplicator(yield select(WhisperForm))
    const token = yield select(Token)

    yield loadingShow('Now 呼び出してるねん Now')

    wf.options.audio = val.file

    const r = yield WhisperModel
                .call(token.token)
                .callWhisper(wf.options)


    yield put({
        type    : 'WhisperForm/setText',
        text    : r,
        key     : val.key,
    })

    yield loadingHide()
}

/**
 * 整形後の文書を保存
 * WhisperFormに整形後の文書を保存し、表示用テキストを更新します。
 *
 * @param val any 整形後の文書データ
 */
export function* setFormation(val: any): any {
    yield put({
        type        : 'WhisperForm/setFormation',
        formation   : val.formation[0].content,
        key         : val.key,
    })

    yield updateShowText(val.key)
    yield loadingHide()
}

/**
 * 要約後の文書を保存
 * WhisperFormに要約後の文書を保存し、表示用テキストを更新します。
 *
 * @param val any 要約後の文書データ
 */
export function* setSummary(val: any): any {
    yield put({
        type    : 'WhisperForm/setSummary',
        summary : val.summary[0].content,
        key     : val.key,
    })

    yield updateShowText(val.key)
    yield loadingHide()
}

/**
 * 表示用のテキストを更新
 * WhisperFormのデータを基に表示用テキストを更新します。
 *
 * @param key number 更新するテキストのキー
 */
export function* updateShowText(key: number): any {
    const wf: WhisperFormInterface = yield select(WhisperForm);
    yield put({
        type        : 'WhisperShowText/set',
        text        : wf.recorder[key].text,
        formation   : wf.recorder[key].formation,
        summary     : wf.recorder[key].summary,
        key         : key
    })
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
    })
}

