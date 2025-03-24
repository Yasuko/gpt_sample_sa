import { put, select, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit'

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

function* checkToken(
    actoin: PayloadAction<{
        next: string,
        payload: any,
    } | {
        redirect: string,
    }> = {
        next: '',
        payload: {},
    }
): any {
    const key = yield StrageModel.call().getAPI()

    if (!key) {
        if ('redirect' in actoin.payload) {
            yield put({
                type: 'TokenForm/setReturn',
                return: actoin.payload,
            })
        }
        window.location.href = './Token'
    } else {
        yield put({
            type: 'TokenForm/setToken',
            token: key,
        })
        if ('next' in actoin.payload) {
            yield put({
                type: actoin.payload.next,
                payload: actoin.payload.payload,
            })
        }
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
