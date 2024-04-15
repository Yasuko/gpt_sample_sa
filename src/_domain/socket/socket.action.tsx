import { put, select, takeEvery } from 'redux-saga/effects'

// import helper
import { SocketHelper } from './helper/socket.helper'
import { ParseHelper } from './helper/parse.helper'

import { loadingHide } from '../animation/animation'
// import reducer
import {
    JobStackPropsInterface,
    JobStackInterface,
    initialState
} from '../_all/reducers/JobStack'

const JobStack = (state: JobStackPropsInterface) => state.JobStack

// Root Saga登録配列
export const RootSocketAction = [
    takeEvery('SocketAction/hub', hub),
    takeEvery('SocketAction/send', send),
    takeEvery('SocketAction/sendMessage', sendMessage)
];



/**
 * Socketの受信受け口
 * @param val 
 * @returns 
 */
export function* hub(val: any): any {
    if (val.data === undefined
        || val.data.data === undefined
    ) {
        console.log(val)
        yield errorJob(val)
        return
    }

    // ジョブスタックからジョブ情報を取得
    const job = yield select(JobStack)
    console.log(job)
    console.log(val.data)
    
    // チャット
    if (val.data.task === 'chat') {
        yield put({
            type                : job.jobs[0].dispatch,
            //[job.jobs[0].task]  : val.data.data.result[0],
            [job.jobs[0].task]  : ParseHelper.call().parse(val.data.data, val.data.task),
            key                 : job.jobs[0].key,
            ...job.jobs[0].options
        })
    }
    // チャット(Function Call)
    if (val.data.task === 'ocr') {
        yield put({
            type                : job.jobs[0].dispatch,
            [job.jobs[0].variable]  : val.data.data[0].message.function_call,
            task                : job.jobs[0].task,
            ...job.jobs[0].options
        })
    }
    // チャット(Function Call)
    if (val.data.task === 'ocr2') {
        yield put({
            type                : job.jobs[0].dispatch,
            [job.jobs[0].variable]  : val.data.data,
            task                : job.jobs[0].task,
        })
    }
    // テキスト生成
    if (val.data.task === 'comp') {
        yield put({
            type                : job.jobs[0].dispatch,
            [job.jobs[0].task]  : val.data.data,
            key                 : job.jobs[0].key,
            ...job.jobs[0].options
        })
    }
    // whisper
    if (val.data.task === 'whisper') {
        yield put({
            type                : job.jobs[0].dispatch,
            [job.jobs[0].task]  : ParseHelper.call().parse(val.data.data, val.data.task),
            key                 : job.jobs[0].key,
            ...job.jobs[0].options
        })
    }
    // image
    if (val.data.task === 'image') {
        yield put({
            type                : job.jobs[0].dispatch,
            [job.jobs[0].task]  : ParseHelper.call().parse(val.data.data, val.data.task),
            key                 : job.jobs[0].key,
            ...job.jobs[0].options
        })
    }
    // Vision
    if (val.data.task === 'vision') {
        yield put({
            type                : job.jobs[0].dispatch,
            [job.jobs[0].task]  : ParseHelper.call().parse(val.data.data, val.data.task),
            ...job.jobs[0].options
        })
    }
    // Speech
    if (val.data.task === 'speech') {
        yield put({
            type                : job.jobs[0].dispatch,
            [job.jobs[0].task]  : ParseHelper.call().parse(val.data.data, val.data.task),
            ...job.jobs[0].options
        })
    }
    // Embed
    if (val.data.task === 'embed') {
        yield put({
            type                : job.jobs[0].dispatch,
            [job.jobs[0].task]  : ParseHelper.call().parse(val.data.data, val.data.task),
            ...job.jobs[0].options
        })
    }
    // Embed2
    if (val.data.task === 'embed2') {
        yield put({
            type                : job.jobs[0].dispatch,
            [job.jobs[0].task]  : val.data.data,
            ...job.jobs[0].options
        })
    }
    // Chroma
    if (val.data.task === 'chroma') {
        yield put({
            type                : job.jobs[0].dispatch,
            [job.jobs[0].task]  : val.data,
            ...job.jobs[0].options
        })
    }
    yield put({
        type    : 'JobStack/reset'
    })
}

/**
 * メッセージを送信する
 * @param val
 * @returns
 */
export function* checkMessage(val: any): any {
    const js = yield select(JobStack)
    if (js.jobs.length > 0 && js.wait === false) {
        yield put({
            type    : 'SocketAction/sendMessage',
            message : js.jobs.slice(0, 1)
        })
        yield put({
            type    : 'JobStack/setWait',
            wait    : true
        })
    }
}

/**
 * データを送信
 * @param val 
 * @returns
 */
export function* sendMessage(val: any): any {
    yield SocketHelper.call()
            .send(
                yield SocketHelper.call().fileToBase64(val.message)
            )
}

export function* send(val: any): any {
    //console.log(JSON.stringify(val.message))
    yield SocketHelper.call().send(val.message)
}

/**
 * エラー発生時の処理
 * @param val 
 */
function* errorJob(val: any): any {
    yield put({
        type    : 'JobStack/reset'
    })

    yield loadingHide()
    
    // トースターアニメーションで失敗を通知
    yield put({
        type        : 'toasterAnimation/setShow',
        show        : true,
        text        : '失敗しました',
        mode        : 'error',
    })
}

