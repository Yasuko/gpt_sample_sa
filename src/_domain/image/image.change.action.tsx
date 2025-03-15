import { put, select, takeEvery } from 'redux-saga/effects'

// import animation
import { loadingShow, loadingHide } from '../animation/animation'

// import model
import { ImageModel } from '../_model/image.model'

// import helper 

// reducer
import {
    ImageChangeOptionPropsInterface
} from './reducers/ImageChangeOption'
import {
    TokenFormPropsInterface
} from '../token/reducers/TokenForm'

// import helper
import { FileHelper } from './helper/file.helper'

const Token = (state: TokenFormPropsInterface) => state.TokenForm
const imageChangeOption = (state: ImageChangeOptionPropsInterface) => state.ImageChangeOption

// Root Saga登録配列
export const RootImageChangeAction = [
    takeEvery('ImageChangeAction/sendPrompt', sendPrompt),
    takeEvery('ImageChangeAction/DragEnd', dragEnd),
]

/**
 * Promptの内容をImageAPIに送信し、画像の変更を行う
 * 変更中のローディング表示、API呼び出し、生成結果のストアへの保存を行う
 *
 * @param val any API呼び出しに必要なデータを含む
 * @returns any 生成された画像データ
 */
function* sendPrompt(val: any): any {

    yield loadingShow('Now 画像生成中や念。Now')

    const options = yield select(imageChangeOption)
    const token = yield select(Token)
    const r = yield ImageModel.call(token.token).generate('change', options)

    yield put({
        type    : 'ImageList/addImages',
        images  : {
            prompt  : (options.prompt) ? options.prompt + '(' + r.data[0].revised_prompt + ')' : '',
            image   : 'data:image/png;base64,' + r.data[0].b64_json,
            revisied_prompt: r.data[0].revised_prompt,
            mask    : (options.mask) ? 'data:image/png;base64,' + options.mask : '',
            job     : val.key,
        }
    })

    yield loadingHide()
}

/**
 * ドラッグ操作の終了時に画像データを設定する
 * ドラッグ終了イベントに基づいて、画像データを更新する
 *
 * @param val any ドラッグ終了イベントを含む
 * @returns void
 */
function* dragEnd(val: any): any {
    yield FileHelper.call().dragEnd(val.event)
    const f = FileHelper.call().getDataFile()

    yield put({
        type        : 'ImageChangeOption/setImage',
        image   : f.image
    })

    yield put({
        type        : 'ImageChangeOption/setImageBase64',
        image_base64   : f.image
    })
    return
}
