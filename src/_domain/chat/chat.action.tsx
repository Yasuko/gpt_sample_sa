import { put, select, takeEvery } from 'redux-saga/effects'

// import animation
import { loadingShow, loadingHide } from '../animation/animation'

// import model
import { ChatModel } from '../_model/chat.model'
import { 
    TokenPropsInterface,
    TokenInterface,
    initialState as ChatTokenInitial
 } from '../_all/reducers/Token'

// import reducer
import {
    ChatFormInterface, ChatFormPropsInterface,
    initialState
} from './reducers/ChatForm'
import { consistent } from '../_helper/object.helper'
import {
    TokenFormPropsInterface
} from '../token/reducers/TokenForm'

// import helper
import { FileHelper } from './helper/file.helper'

const ChatToken = (state: TokenPropsInterface) => state.Token
const Token = (state: TokenFormPropsInterface) => state.TokenForm
const chatForm = (state: ChatFormPropsInterface) => state.ChatForm

// Root Saga登録配列
export const RootChatAction = [
    takeEvery('ChatAction/sendChat', sendChat), // Chatを送信する
    takeEvery('ChatAction/exportChat', exportChat), // Chatを外部アクションから呼び出す
    takeEvery('ChatAction/dragStart', dragStart),
    takeEvery('ChatAction/dragEnd', dragEnd),

    takeEvery('ChatAction/addTooles', addTooles),

]

/**
 * Chatを送信するSaga関数。
 * ChatFormの状態を取得し、APIを呼び出して結果を処理します。
 */
function* sendChat(): any {
    yield loadingShow('Now 呼び出してるねん Now');

    const cf: ChatFormInterface = yield select(chatForm);
    const token = yield select(Token);
    const block = consistent(cf.chatBlock, initialState.chatBlock)
                    ? undefined
                    : cf.chatBlock;

    // ChatBlockに送信したメッセージを追加
    yield put({
        type        : 'ChatForm/addChatBlock',
        payload     : cf.newChat
    });

    // ChatAPIをコール
    const r = yield ChatModel.call(token.token)
                .callDocumetSummary([cf.newChat], cf.options);

    if ('usage' in r) {
        yield put({
            type        : 'Token/setHistory',
            payload     : r.usage
        });
    }

    // messagesに格納された全てのメッセージをChatBlockに追加
    yield put({
        type        : 'ChatForm/addChatBlock',
        payload   : {
            role    : 'system',
            content : r.choices[0].message.content
        }
    });

    yield put({
        type        : 'ChatForm/resetNewChat',
    });

    yield loadingHide();
}

/**
 * Chat機能を外部アクションから呼び出すためのSaga関数。
 *
 * @param val - 外部から渡される値。
 */
function* exportChat(val: any): any {
    const cf: ChatFormInterface = yield select(chatForm);
    const token = yield select(Token);

    // ChatAPIをコール
    const r = yield ChatModel.call(token.token)
        .callDocumetSummary(val.chat, cf.options);
    yield put({
        type    : val.dispatch,
        role    : r.choices[0].message.role,
        content : r.choices[0].message.content,
    });
}

/**
 * ドラッグ開始時の処理を行うSaga関数。
 */
function* dragStart(): any {}

/**
 * ドラッグ終了時の処理を行うSaga関数。
 *
 * @param val - ドラッグイベントの情報。
 */
function* dragEnd(val: any): any {
    yield FileHelper.call().dragEnd(val.event);
    const f = FileHelper.call().getDataFile();
    console.log(f);
    yield put({
        type        : 'ChatForm/addNewChat',
        payload     : [{
            type: 'image_url',
            image_url: {
                url: f.image,
            },
        }]
    });
}

/**
 * ツールを追加するSaga関数。
 *
 * @param val - ツール情報。
 */
function* addTooles(val: any): any {
    const cf: ChatFormInterface = yield select(chatForm);
    const token = yield select(Token);

    // ChatAPIをコール
    const r = yield ChatModel.call(token.token)
        .callDocumetSummary(val.tool, cf.options);
    yield put({
        type    : val.dispatch,
        role    : r.choices[0].message.role,
        content : r.choices[0].message.content,
    });
}