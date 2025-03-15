import { put, select, takeEvery } from 'redux-saga/effects'

// import animation
import { loadingShow, loadingHide } from '../animation/animation'

// import model
import { ChatModel } from '../_model/chat.model'

// import reducer
import {
    VectorBatchPropsInterface,
    VectorBatchInterface,
    initialState
} from './reducers/VectorBatch'

// import helper
import { FileHelper } from './helper/file.helper'


// Root Saga登録配列
export const RootVectorBatchAction = [
    takeEvery('VectorBatchAction/send', send), // Chatを送信する

]

function* send(): any {
    yield loadingShow('Now 呼び出してるねん Now');

    yield loadingHide();
}
