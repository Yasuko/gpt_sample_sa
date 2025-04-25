import { put, select, takeEvery } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

// import animation
import { loadingShow, loadingHide } from '../animation/animation'

// import model
import {
    TokenFormPropsInterface,
    TokenFormInterface,
    initialState as TokenInitial
 } from '../token/reducers/TokenForm'
import {
    FileModel
} from '../_model/file.model'

// import reducer

import {
    FileFormPropsInterface,
    FileFormInterface,
    initialState as initialFileForm
} from './reducers/FileForm'

// import helper
import { FileHelper } from './helper/file.helper'
import { FileListResponseType, FileResponseType } from '@/_lib/gpt/_helper/file.helper'

const Token = (state: TokenFormPropsInterface) => state.TokenForm

const FileForm = (state: FileFormPropsInterface) => state.FileForm


// Root Saga登録配列
export const RootFileAction = [
    takeEvery('FileAction/initialLoad', initialLoad),
    takeEvery('FileAction/upload', upload),
    takeEvery('FileAction/download', download),
    takeEvery('FileAction/remove', remove),
    takeEvery('FileAction/show', show),

    takeEvery('FileAction/dragEnd', dragEnd),
]

function* initialLoad(): any {
    const token = yield select(Token)

    if (token.token === undefined || token.token === '') {
        yield put({
            type: 'TokenAction/checkToken',
            payload: {
                next: 'FileAction/initialLoad',
                payload: ''
            }
        })
        return
    }
    const files: FileListResponseType = yield FileModel
                    .call(token.token)
                    .list()
    console.log(files)
    yield put({
        type: 'Files/set',
        payload: files.data
    })
    

}

function* upload(action: PayloadAction): any {
    const file: FileFormInterface = yield select(FileForm)
    const token = yield select(Token)

    if (token.token === '') {
        return;
    }

    try {
        FileModel.call(token.token).multiUpload(file.files)
        yield put({
            type: 'FileForm/reset'
        })
    } catch (error) {
        console.log(error)
    }

}

function* download(action: PayloadAction<string>): any {
    const token = yield select(Token)

    if (token.token === '') {
        return
    }

    console.log(action.payload)

    try {
        yield FileModel.call(token.token)
                    .download(action.payload)
    } catch (error) {
        console.log(error)
    }
}

function* remove(action: PayloadAction<string>): any {
    const token = yield select(Token)

    if (token.token === '') {
        return
    }

    try {
        yield FileModel.call(token.token).delete(action.payload)
        yield initialLoad()
    } catch (error) {
        console.log(error)
    }
}

function* show(action: PayloadAction<string>): any {
    const token = yield select(Token)

    if (token.token === '') {
        return
    }
    console.log(action.payload)

    try {
        const file: FileResponseType = yield FileModel.call(token.token)
                    .retrieve(action.payload)

        console.log(file)
        yield put({
            type: 'FileShow/set',
            payload: file
        })
        yield put({
            type: 'FileScreen/set',
            payload: {
                show: true,
                target: 'show'
            }
        })
    } catch (error) {
        console.log(error)
    }
}

function* dragEnd(val: any): any {
    yield FileHelper.call().dragEnd(val.event)
    const f = FileHelper.call().getDataFiles()

    for (const f_ of f) {
        yield put({
            type: 'FileForm/add',
            payload: {
                ...f_,
                purpose: 'user_data'
            }
        })
    }

}
