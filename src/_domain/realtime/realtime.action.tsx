import { put, select, takeEvery } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

// import model
import {
    conn,
    sendData
} from '../_model/realtime.model'
import {
    StrageModel
} from '../_model/strage.model'

// import reducer
import {
    RealtimeFormInterface,
    RealtimeFormPropsInterface,
    initialState
} from './reducers/RealtimeForm'
import { consistent } from '../_helper/object.helper'

// import helper
import {
    TokenFormPropsInterface
} from '../token/reducers/TokenForm'



// Root Saga登録配列
export const RootRealtimeAction = [
    // 録音開始

    takeEvery('RealtimeAction/connection', connection)
]



function* connection(val: PayloadAction<any>): any {
    console.log(val)
    try {
        const key: string = yield StrageModel.call().getAPI()
        yield conn(key)
    } catch (error) {
        console.error(error)
    }
}