import { put, select, takeEvery } from 'redux-saga/effects'

// import animation
import { loadingShow, loadingHide } from '../animation/animation'

// import model
import { ImageModel } from '../_model/image.model'

// import helper 
import { toMatchImage } from './helper/paint.helper'

// reducer
import {
    ImageEditOptionPropsInterface
} from './reducers/ImageEditOption'
import {
    TokenFormPropsInterface
} from '../token/reducers/TokenForm'

// import helper
import { FileHelper } from './helper/file.helper'
import { setupPaint } from './helper/paint.helper'


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
 * Promptの内容をImageAPIに送信する
 * @param val any
 * @returns any
 */
function* sendPrompt(val: any): any {

    yield loadingShow('Now 画像再生成中や念。Now')
    let options: any = {}
    options = yield select(imageEditOption)

    const token = yield select(Token)
    const r = yield ImageModel.call(token.token).generate('edit', options)

    console.log(r)
    yield put({
        type    : 'ImageList/addImages',
        images  : {
            prompt  : (options.prompt) ? options.prompt  : '',
            image   : 'data:image/png;base64,' + r.data[0].b64_json,
            revisied_prompt: r.data[0].revised_prompt,
            mask    : (options.mask) ? 'data:image/png;base64,' + options.mask : '',
            job     : val.key,
        }
    });

    yield loadingHide();
}

function* dragEnd(val: any): any {
    yield FileHelper.call().dragEnd(val.event)
    const f = FileHelper.call().getDataFile()
    console.log(f)

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

function* setupMaskPaint() {
    const image = yield select(imageEditOption)
    yield setupPaint('mask-paint-target', image.image_base64)
}

function* saveMakeMask(val: any): any {
    const image = yield select(imageEditOption)

    yield put({
        type        : 'ImageEditOption/setMaskBase64',
        mask_base64 : yield toMatchImage(image.image_base64, val.mask_base64)
    })
}