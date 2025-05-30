import { put, select, takeEvery } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

// import animation
import { loadingShow, loadingHide } from '../animation/animation'

// import model
import {
    TokenFormInterface,
    TokenFormPropsInterface,
} from '../token/reducers/TokenForm'

import {
    VectorBatchModel
} from '../_model/vectorBatch.model'

// import reducer
import {
    VectorBatchPropsInterface,
    VectorBatchInterface,
    initialState
} from './reducers/VectorBatch'
import {
    VectorBatchFormPropsInterface,
    VectorBatchFormInterface
} from './reducers/VectorBatchForm'
import {
    VectorBatchEditPropsInterface,
    VectorBatchEditInterface
} from './reducers/VectorBatchEdit'


// import helper
import { FileHelper } from './helper/file.helper'
import TokenForm from '../token/reducers/TokenForm'

const Token = (state: TokenFormPropsInterface) => state.TokenForm

const Batch = (state: VectorBatchPropsInterface) => state.VectorStore
const BatchForm = (state: VectorBatchFormPropsInterface) => state.VectorBatchForm
const BatchEdit = (state: VectorBatchEditPropsInterface) => state.VectorBatchEdit

// Root Saga登録配列
export const RootVectorBatchAction = [
    takeEvery('VectorBatchAction/initialLoad', initialLoad),
    takeEvery('VectorBatchAction/newBatch', newBatch),
    takeEvery('VectorBatchAction/retriev', retrieveBatch),
]

function* initialLoad(
    action: PayloadAction<{
        storeId: string,
        batchId: string
    }>
): any {
    yield loadingShow('Now 呼び出してるねん Now');
    const token = yield select(Token)

    if (token.token === '') {
        yield loadingHide();
        return;
    }
    const batch = yield VectorBatchModel
                    .call(token.token)
                    .list(action.payload.storeId, action.payload.batchId)
    

}

function* newBatch(action: PayloadAction<{
    storeId: string,
    batchId: string,
    file: File
}>): any {
    const batch: VectorBatchFormInterface = yield select(BatchForm)
    const token: TokenFormInterface = yield select(Token)

    if (token.token === '') {
        return;
    }

    VectorBatchModel.call(token.token).new(action.payload.storeId, batch)



    yield loadingHide();
}


function* retrieveBatch(): any {
    yield loadingShow('Now 呼び出してるねん Now');
    const token = yield select(Token)

}