import { put, select, takeEvery } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

// import animation
import { loadingShow, loadingHide } from '../animation/animation'

// import model
import {
    TokenPropsInterface
} from '../_all/reducers/Token'
import {
    FileModel
} from '../_model/file.model'

// import reducer
import {
    FilesPropsInterface,
    FilesInterface,
    initialState
} from './reducers/Files'
import {
    FileEditPropsInterface,
    FileEditInterface,
    initialState as initialFileEdit
} from './reducers/FileEdit'
import {
    FileFormPropsInterface,
    FileFormInterface,
    initialState as initialFileForm
} from './reducers/FileForm'

// import helper
import { FileHelper } from './helper/file.helper'

const Token = (state: TokenPropsInterface) => state.Token

const Files = (state: FilesPropsInterface) => state.Files
const FileEdit = (state: FileEditPropsInterface) => state.FileEdit
const FileForm = (state: FileFormPropsInterface) => state.FileForm


// Root Saga登録配列
export const RootFileAction = [
    takeEvery('FileAction/initialLoad', initialLoad),
    takeEvery('FileAction/newFile', newFile),
    takeEvery('FileAction/delFile', delFile),
]

function* initialLoad(
    action: PayloadAction<{
        storeId: string,
        batchId: string
    }>
): any {
    const token = yield select(Token)

    if (token.token === '') {
        return;
    }
    const batch = yield FileModel
                    .call(token.token)
                    .list()
    

}

function* newFile(action: PayloadAction): any {
    const file = yield select(FileForm)
    const token = yield select(Token)

    if (token.token === '') {
        return;
    }

    FileModel.call(token.token).upload(action.payload.storeId)

}


function* delFile(action: PayloadAction<string>): any {
    const token = yield select(Token)

}