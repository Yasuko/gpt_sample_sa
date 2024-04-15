import { put, select, takeEvery } from 'redux-saga/effects';

// import helper
import { SocketHelper } from '../socket/helper/socket.helper';

import { loadingShow, loadingHide } from '../animation/animation'
// reducer
import {
    CompFormInterface, CompFormPropsInterface,
    initialState
} from './reducers/CompForm';

const compForm = (state: CompFormPropsInterface) => state.CompForm;

// Root Saga登録配列
export const RootCompAction = [
    takeEvery('CompAction/sendPrompt', sendPrompt),
    takeEvery('CompAction/setPrompt', setPrompt),
    takeEvery('CompAction/exportComp', exportComp),
];

/**
 * Chatを送信する
 * @param val 
 */
export function* sendPrompt(val: any): any {
    yield loadingShow('Now 呼び出してるねん Now');

    const cf: CompFormInterface = yield select(compForm);
    console.log(cf)

    // JobStackにChatを登録
    yield put({
        type        : 'JobStack/setJobStack',
        jobs        : [{
            job         : 'comp',
            dispatch    : 'CompAction/setPrompt',
            task        : 'messages',
        }]
    })

    // CompletionAPIのコール要求をサーバーに送信
    yield SocketHelper.call().send(
        {
            task    : 'comp',
            options : {
                ...cf.options,
                ...{
                    prompt : cf.prompt,
                }
            },
        }
    )
}

/**
 * Chat機能を外部アクションから呼び出したい時に使う
 * @param val 
 */
export function* exportComp(val: any): any {

    yield put({
        type    : 'JobStack/setJobStack',
        jobs    : [{
            job         : 'comp',
            dispatch    : 'CompAction/setPrompt',
            task        : 'messages',
        }]
    })
    // CompletionAPIのコール要求をサーバーに送信
    yield SocketHelper.call().send(
        {
            task    : 'comp',
            prompt  : val.prompt,
        }
    )
}

/**
 * ChatGPTからの戻りデータを保存する
 * @param val 
 */
export function* setPrompt(val: any): any {
    const cf: CompFormInterface = yield select(compForm);
    console.log(val)
    
    // messagesに格納された全てのメッセージをChatBlockに追加
    for (let i = 0; i < val.messages.length; i++) {
        yield put({
            type    : 'CompForm/addSave',
            save    : {
                prompt    : cf.prompt,
                result    : val.messages[i].text,
            }
        })
    }

    yield put({
        type        : 'CompForm/setPrompt',
        prompt      : ''
    })

    yield loadingHide();
}

