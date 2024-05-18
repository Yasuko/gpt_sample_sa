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
    TokenFormPropsInterface
} from '../token/reducers/TokenForm'

// import helper

const Token = (state: TokenFormPropsInterface) => state.TokenForm
const imageOption = (state: ImageOptionPropsInterface) => state.ImageOption

// Root Saga登録配列
export const RootImageAction = [
    takeEvery('ImageAction/sendPrompt', sendPrompt),
    takeEvery('ImageAction/deleteImage', deleteImage),
]

/**
 * Promptの内容をImageAPIに送信する
 * @param val any
 * @returns any
 */
function* sendPrompt(val: any): any {

    yield loadingShow('Now 画像生成中や念。Now')
    let options: any = {}
    options = yield select(imageOption)

    const token = yield select(Token)
    const r = yield ImageModel.call(token.token).generate('generate', options)
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
    })

    yield loadingHide()
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
    })
}
