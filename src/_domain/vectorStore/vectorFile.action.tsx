import { put, select, takeEvery } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

// import animation
import { loadingShow, loadingHide } from '../animation/animation'

// import model
import { VectorFileModel } from '../_model/vectorFile.model'

// import reducer
import {
    TokenFormPropsInterface
} from '../token/reducers/TokenForm'
import {
    VectorFilePropsInterface,
    VectorFileInterface,
    initialState
} from './reducers/VectorFile'
import {
    VectorFileFormPropsInterface,
    VectorFileFormInterface,
} from './reducers/VectorFileForm'
import {
    VectorFileEditPropsInterface,
    VectorFileEditInterface
} from './reducers/VectorFileEdit'
import { ListVectorStoreFileType } from '@/_lib/gpt/_helper/vector_store.helper'

// import helper

const Token = (state: TokenFormPropsInterface) => state.TokenForm

const Files = (state: VectorFilePropsInterface) => state.VectorFile
const FileForm = (state: VectorFileFormPropsInterface) => state.VectorFileForm
const FileEdit = (state: VectorFileEditPropsInterface) => state.VectorFileEdit

// Root Saga登録配列
export const RootVectorFileAction = [
    takeEvery('VectorFileAction/initialLoad', initialLoad),
    takeEvery('VectorFileAction/beginNew', beginNew),
    takeEvery('VectorFileAction/compNew', compNew),
    takeEvery('VectorFileAction/beginEdit', beginEdit),
    takeEvery('VectorFileAction/compEdit', compEdit),
    takeEvery('VectorFileAction/remove', removeFile),

]

function* initialLoad(
    action: PayloadAction<string> = { type: '', payload: '' }
): any {
    const files: VectorFileInterface = yield select(Files)
    const token = yield select(Token)
    console.log(files)
    if (token.token === '') {
        yield put({
            type: 'TokenAction/checkToken',
            payload: {
                next: 'VectorFileAction/initialLoad',
                payload: false
            }
        })
        return
    }

    if (files.files.length === 0 && action.payload === '') return

    const res: ListVectorStoreFileType = yield VectorFileModel.call(token.token).list(action.payload, {})

    yield put({
        type: 'VectorFile/set',
        payload: res
    })

}

function* beginNew(): any {
    
    yield put({ type: 'FileAction/initialLoad' })
    yield put({ type: 'VectorFileForm/reset' })

    yield put({
        type: 'VectorStoreScreen/set',
        payload: {
            show: true,
            target: 'file_form'
        }
    })
}

function* compNew(): any {

    const file = yield select(FileForm)
    const token = yield select(Token)

    if (token.token === '') return

    const result = yield VectorFileModel.call(token.token).new('', file)

    yield put({
        type: 'VectorStoreScreen/set',
        payload: {
            show: false,
            target: ''
        }
    })
    yield put({
        type: 'VectorFileAction/initialLoad',
        payload: ''
    })
}

function* beginEdit(): any {
    const file = yield select(FileEdit)
    const token = yield select(Token)

    if (token.token === '') return

    yield put({
        type: 'VectorStoreScreen/set',
        payload: {
            show: true,
            target: 'file_edit'
        }
    })
}

function* compEdit(): any {
    const file = yield select(FileEdit)
    const token = yield select(Token)

    if (token.token === '') return

    yield put({
        type: 'VectorStoreScreen/set',
        payload: {
            show: false,
            target: ''
        }
    })
    yield put({
        type: 'VectorFileAction/initialLoad',
        payload: ''
    })
}


function* removeFile(
    action: PayloadAction<string>
): any {
    const token = yield select(Token)

    if (token.token === '') return

    const res = yield VectorFileModel.call(token.token).remove(action.payload)
    if ('usage' in res) {
        yield put({
            type: 'Token/setHistory',
            payload: res.usage
        })
    }
}
