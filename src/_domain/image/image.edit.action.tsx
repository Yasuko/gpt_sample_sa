import { put, select, takeEvery } from 'redux-saga/effects'

// import animation
import { loadingShow, loadingHide } from '../animation/animation'

// import model
import { ImageModel } from '../_model/image.model'

// import helper 
import { toMatchImage, getInvertMask } from './helper/paint.helper'
import { FileHelper } from './helper/file.helper'
import { setupPaint } from './helper/paint.helper'

// reducer
import {
    ImageEditOptionPropsInterface,
    ImageEditOptionInterface
} from './reducers/ImageEditOption'
import {
    TokenFormPropsInterface
} from '../token/reducers/TokenForm'




const Token = (state: TokenFormPropsInterface) => state.TokenForm
const imageEditOption = (state: ImageEditOptionPropsInterface) => state.ImageEditOption

// Root Saga登録配列
export const RootImageEditAction = [
    takeEvery('ImageEditAction/sendPrompt', sendPrompt),
    takeEvery('ImageEditAction/DragEnd', dragEnd),
    takeEvery('ImageEditAction/setupMaskPaint', setupMaskPaint),
    takeEvery('ImageEditAction/saveMakeMask', saveMakeMask),
]

/**
 * Promptの内容をImageAPIに送信し、画像の再生成を行う
 * 再生成中のローディング表示、API呼び出し、生成結果のストアへの保存を行う
 *
 * @param val any API呼び出しに必要なデータを含む
 * @returns any 生成された画像データ
 */
function* sendPrompt(val: any): any {

    yield loadingShow('Now 画像再生成中や念。Now')
    let options: any = {}
    options = yield select(imageEditOption)
    console.log('sendPrompt', options)
    const token = yield select(Token)
    const r = yield ImageModel.call(token.token).generate('edit', options)
    const op: any = {
        prompt  : (options.prompt) ? options.prompt  : '',
        image   : 'data:image/png;base64,' + r.data[0].b64_json,
        revisied_prompt: r.data[0].revised_prompt,
        job     : val.key,
    }

    if (options.mask !== '') {
        op['mask'] = 'data:image/png;base64,' + options.mask
    }

    console.log(r)
    yield put({
        type    : 'ImageList/addImages',
        images  : op
    })

    yield loadingHide()
}

/**
 * ドラッグ操作の終了時に画像やマスクを設定する
 * ドラッグ終了イベントに基づいて、画像またはマスクのデータを更新する
 *
 * @param val any ドラッグ終了イベントとターゲット情報を含む
 * @returns void
 */
function* dragEnd(val: any): any {
    yield FileHelper.call().dragEnd(val.event)
    const f = FileHelper.call().getDataFile()
    console.log(f)

    if (f.type !== 'png') {
        f.image = yield FileHelper.call().toPng(f.image, f.type)
        f.type = 'png'
    }

    if (val.target === 'base') {
        yield put({
            type    : 'ImageEditOption/setImage',
            image   : f.image
        })
        yield put({
            type    : 'ImageEditOption/setImageBase64',
            image_base64: f.image
        })
    } else { 
        yield put({
            type    : 'ImageEditOption/setMask',
            mask    : f.image
        })
        yield put({
            type    : 'ImageEditOption/setMaskBase64',
            mask_base64: f.image
        })
    }
    return
}

/**
 * マスクペイントのセットアップを行う
 * 指定されたターゲット要素に対して、画像のベース64データを使用してペイントを初期化する
 *
 * @returns void
 */
function* setupMaskPaint(): any {
    const image: ImageEditOptionInterface = yield select(imageEditOption)
    yield setupPaint('mask-paint-target', image.image_base64)
}

/**
 * 生成されたマスクを保存する
 * 画像データとマスクデータを一致させ、ストアに保存する
 *
 * @param val any マスクのベース64データを含む
 * @returns void
 */
function* saveMakeMask(val: any): any {
    const image = yield select(imageEditOption)
    const _mask = yield getInvertMask(val.mask_base64)

    yield put({
        type        : 'ImageEditOption/setMaskBase64',
        mask_base64 : yield toMatchImage(image.image_base64, _mask)
    })
}