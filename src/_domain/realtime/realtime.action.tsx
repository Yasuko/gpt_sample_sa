import { put, select, takeEvery } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

// import model
import {
    connect,
    disconnect,
    updateSession,
    pushText
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
import {
    initialRealtimeForm
} from './reducers/__type.realtime'

// import helper
import {
    TokenFormPropsInterface
} from '../token/reducers/TokenForm'



// Root Saga登録配列
export const RootRealtimeAction = [
    takeEvery('RealtimeAction/connection', connection),
    takeEvery('RealtimeAction/close', close),
    takeEvery('RealtimeAction/push', push)
]



function* connection(val: PayloadAction<any>): any {
    console.log('Connect Realtime Server')
    try {
        const key: string = yield StrageModel.call().getAPI()
        console.log(key)
        yield connect(key)
        yield sleep(5)
        yield updateSession(initialRealtimeForm.SessionOptions)
    } catch (error) {
        console.error(error)
    }
}

function* close(val: PayloadAction<any>): any {
    console.log(val)
    try {
        yield disconnect()
    } catch (error) {
        console.error(error)
    }
}

function* push(val: PayloadAction<any>): any {
    console.log(val)
    try {
        yield pushText(val.payload)
    } catch (error) {
        console.error(error)
    }
}

// sleep関数
function sleep(sec: number) {
    return new Promise(resolve => setTimeout(resolve, sec * 1000))
}