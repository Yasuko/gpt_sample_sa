import { put, select, takeEvery } from 'redux-saga/effects'

// import animation
import { loadingShow, loadingHide } from '../animation/animation'

// import model
import { ImageModel } from '../_model/image.model'

// reducer
import {
    ImageOptionPropsInterface
} from './reducers/ImageOption'
import {
    ImageEditOptionPropsInterface
} from './reducers/ImageEditOption'
import {
    ImageChangeOptionPropsInterface
} from './reducers/ImageChangeOption'
import {
    TokenFormPropsInterface
} from '../token/reducers/TokenForm'

// import helper
import { FileHelper } from './helper/file.helper'

const Token = (state: TokenFormPropsInterface) => state.TokenForm
const imageOption = (state: ImageOptionPropsInterface) => state.ImageOption
const imageEditOption = (state: ImageEditOptionPropsInterface) => state.ImageEditOption
const imageChangeOption = (state: ImageChangeOptionPropsInterface) => state.ImageChangeOption

// Root Saga登録配列
export const RootImageAction = [
    takeEvery('ImageAction/sendPrompt', sendPrompt),
    takeEvery('ImageAction/deleteImage', deleteImage),
    takeEvery('ImageAction/DragEnd', dragEnd),
]

/**
 * Promptの内容をImageAPIに送信する
 * @param val any
 * @returns any
 */
function* sendPrompt(val: any): any {

    yield loadingShow('Now 画像生成中や念。Now')
    let options: any = {}
    if (val.job === 'generate') options = yield select(imageOption)
    if (val.job === 'edit') options = yield select(imageEditOption)
    if (val.job === 'change') options = yield select(imageChangeOption)

    console.log(options)

    const token = yield select(Token)
    const r = yield ImageModel.call(token.token).generate(val.job, options)

    console.log(r)
    yield put({
        type    : 'ImageList/addImages',
        images  : {
            prompt  : (options.prompt) ? options.prompt + '(' + r.data[0].revised_prompt + ')' : '',
            image   : 'data:image/png;base64,' + r.data[0].b64_json,
            revisied_prompt: r.data[0].revised_prompt,
            mask    : (options.mask) ? 'data:image/png;base64,' + options.mask : '',
            job     : val.key,
        }
    });

    yield loadingHide();
}

/**
 * Imageを削除
 * @param val
 * @returns any
 */
function* deleteImage(val: any): any {
    yield put({
        type    : 'ImageForm/deleteImages',
        key     : val.key
    });
}

function* dragEnd(val: any): any {
    console.log(val)
    yield FileHelper.call().dragEnd(val.event)
    const f = FileHelper.call().getDataFile()
    console.log(f)

    if (val.job === 'edit') {
        if (val.target === 'base') 
            yield put({
                type    : 'ImageEditOption/setImage',
                image   : f.image
            })
        else 
            yield put({
                type    : 'ImageEditOption/setMask',
                mask    : f.image
            })
        return
    }
    if (val.job === 'change') {
        yield put({
            type    : 'ImageChangeOption/setImage',
            image   : f.image
        })
        return
    }
}