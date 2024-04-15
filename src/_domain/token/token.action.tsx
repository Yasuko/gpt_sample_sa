import { put, select, takeEvery } from 'redux-saga/effects';

// import model
import { StrageModel } from '../_model/strage.model'

// import reducer
import {
    TokenFormPropsInterface,
} from './reducers/TokenForm'

const Token = (state: TokenFormPropsInterface) => state.TokenForm;

export const RootTokenAction = [
    takeEvery('TokenAction/checkToken', checkToken),
    takeEvery('TokenAction/setToken', setToken),
]

function* checkToken(val: any): any
{
    const key = yield StrageModel.call().getAPI()

    if (!key) {
        yield put({
            type: 'TokenForm/setReturn',
            return: 'Chat',
        })
        window.location.href = './Token'
    } else {
        yield put({
            type: 'TokenForm/setToken',
            token: key,
        })
    }

    return
}

function* setToken(val: any): any
{
    const token = yield select(Token)
    yield put({
        type: 'TokenForm/setToken',
        token: val.token,
    })

    yield StrageModel.call().setAPI(val.token)

    window.location.href = './' + token.return
}
