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
} from './reducers/VectorStore'
import { consistent } from '../_helper/object.helper'


// import helper
import { FileHelper } from './helper/file.helper'


// Root Saga登録配列
export const RootVectorStoreAction = [
    takeEvery('VectorStorAction/sendChat', sendChat), // Chatを送信する

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
