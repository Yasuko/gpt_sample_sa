import { put, select, takeEvery } from 'redux-saga/effects'

// import model
import { EmbedModel } from '../_model/embed.model'

// import animation
import { loadingShow, loadingHide } from '../animation/animation'

// import helper
import { FileHelper } from './helper/file.helper'
// import { convertToText } from './helper/to_text.helper'
import { getSimilarity } from './helper/embed.helper'
// reducer
import {
    EmbedFormInterface, EmbedFormPropsInterface,
} from './reducers/EmbedForm'
import {
    EmbedDictionaryInterface, EmbedDictionaryPropsInterface,
} from './reducers/EmbedDictionary'
import { TokenFormPropsInterface } from '../token/reducers/TokenForm'

const Token = (state: TokenFormPropsInterface) => state.TokenForm
const embedForm = (state: EmbedFormPropsInterface) => state.EmbedForm
const embedDoc = (state: EmbedDictionaryPropsInterface) => state.EmbedDictionary

// Root Saga登録配列
export const RootEmbedAction = [
    takeEvery('EmbedAction/send', send),
    takeEvery('EmbedAction/textChange', textChange),
    takeEvery('EmbedAction/dragStart', dragStart),
    takeEvery('EmbedAction/dragEnd', dragEnd),
    takeEvery('EmbedAction/docSearch', docSearch),
];

/**
 * Chatを送信する
 * @param val 
 */
export function* send(val: any): any {
    yield loadingShow('Now 呼び出してるねん Now');

    const token = yield select(Token)
    const ef: EmbedFormInterface = yield select(embedForm)

    const r = yield EmbedModel.call(token.token).callEmbed(ef.input, ef.options)
    console.info('return response', r)

    // messagesに格納された全てのメッセージをChatBlockに追加
    yield put({
        type        : 'EmbedDictionary/add',
        doc         : {
            title   : 'Embed code : ' + Math.floor(Date.now() / 1000),
            document: val.input,
            embed   : r.data[0].embedding,
        }
    })

    yield loadingHide()
}

function* textChange(val: any): any {
    const ef: EmbedFormInterface = yield select(embedForm)
/*
    const re = yield convertToText(ef.file, ef.type)
    
    yield put({
        type        : 'EmbedForm/setInput',
        input        : re,
    })

    yield put({
        type        : 'EmbedAction/send',
    })
    */
}

function* dragStart(val: any): any {}

function* dragEnd(val: any): any {
    yield FileHelper.call().dragEnd(val.event)
    const f = FileHelper.call().getDataFile()
    console.log(f)
    
    
    yield put({
        type        : 'EmbedForm/setFile',
        file        : f.data,
    })
    yield put({
        type        : 'EmbedForm/setType',
        fileType    : f.type,
    })

    yield put({
        type        : 'EmbedAction/textChange',
    })
}


function* docSearch(val: any): any {

    if(
        val.messages !== undefined
        && val.messages.embedding !== undefined
    ) {
        const ed: EmbedDictionaryInterface = yield select(embedDoc)
        const re = ed.docs.filter((d: any) => {
            const sim = getSimilarity(d.embed, val.messages.embedding)
            console.log(sim)
            return sim
        })
        console.log(re)
    } else {

        // JobStackにChatを登録
        yield put({
            type        : 'JobStack/setJobStack',
            jobs        : [{
                job         : 'embed',
                dispatch    : 'EmbedAction/docSearch',
                task        : 'messages',
            }]
        })

        // ChatAPIのコール要求をサーバーに送信
        yield put({
            type        : 'SocketAction/send',
            message     : {
                task    : 'embed',
                input   : val.question,
            }
        })
    }

}