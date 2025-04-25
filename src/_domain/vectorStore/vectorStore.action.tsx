import { put, select, takeEvery } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

// import animation

// import model
import {
    TokenFormPropsInterface
} from '../token/reducers/TokenForm'
import {
    VectorStoreModel
} from '../_model/vectorStore.model'

// import reducer
import {
    VectorStorePropsInterface,
    VectorStoreInterface,
    initialState
} from './reducers/VectorStore'
import {
    VectorStoreFormPropsInterface,
    VectorStoreFormInterface,
} from './reducers/VectorStoreForm'
import {
    VectorStoreEditPropsInterface,
    VectorStoreEditInterface
} from './reducers/VectorStoreEdit'


// import helper

const Token = (state: TokenFormPropsInterface) => state.TokenForm

const Store = (state: VectorStorePropsInterface) => state.VectorStore
const StoreForm = (state: VectorStoreFormPropsInterface) => state.VectorStoreForm
const StoreEdit = (state: VectorStoreEditPropsInterface) => state.VectorStoreEdit

// Root Saga登録配列
export const RootVectorStoreAction = [
    takeEvery('VectorStoreAction/initialLoad', initialLoad),

    takeEvery('VectorStoreAction/beginNew', beginNew),
    takeEvery('VectorStoreAction/compNew', compNew),

    takeEvery('VectorStoreAction/beginEdit', beginEdit),
    takeEvery('VectorStoreAction/compEdit', compEdit),

    takeEvery('VectorStoreAction/retrieve', retrieveStore),
    takeEvery('VectorStoreAction/search', searchStore),
    takeEvery('VectorStoreAction/remove', removeStore),
    takeEvery('VectorStoreAction/update', updateStore),

    takeEvery('VectorStoreAction/closeScreen', closeScreen),
]

function* initialLoad(
    action: PayloadAction<boolean> = { type: '', payload: false }
): any {
    
    const stores = yield select(Store)
    const token = yield select(Token)

    if (token.token === '') {
        yield put({
            type: 'TokenAction/checkToken',
            payload: {
                next: 'VectorStoreAction/initialLoad',
                payload: false
            }
        })
        return
    }

    if (stores.VectorStores.length > 0 && action.payload === false) return

    const model = VectorStoreModel.call(token.token)
    const result = yield model.list({})

    yield put({
        type: 'VectorStore/set',
        payload: result.data
    })
}

function* beginNew(): any {
    yield put({
        type: 'VectorStoreForm/reset'
    })
    yield put({
        type: 'VectorStoreScreen/set',
        payload: {
            show: true,
            target: 'store_form'
        }
    })
}

function* compNew(): any {
    const store = yield select(StoreForm)
    const token = yield select(Token)

    if (token.token === '') {
        return
    }

    console.log('Store', store)
    console.log('Token', token)
    const model = VectorStoreModel.call(token.token)
    const result = yield model.new(store)

    if ('name' in result && result.name === store.name) {
        yield initialLoad({ type: '', payload: true })
        yield put({
            type: 'VectorStoreScreen/reset'
        })
        yield put({
            type: 'VectorStoreForm/reset'
        })
    }
}

function* beginEdit(
    action: PayloadAction<string>
): any {
    const store: VectorStoreInterface = yield select(Store)
    yield put({
        type: 'VectorStoreEdit/set',
        payload: store.VectorStores.find((v) => v.id === action.payload)
    })
    yield put({
        type: 'VectorStoreScreen/set',
        payload: {
            show: true,
            target: 'store_edit'
        }
    })
}

function* compEdit(): any {
    const store = yield select(StoreEdit)
    const token = yield select(Token)

    if (token.token === '') return

    const model = VectorStoreModel.call(token.token)
    const result = yield model.retrieve(store)

    if ('name' in result && result.name === store.name) {
        yield initialLoad({ type: '', payload: true })
        yield put({
            type: 'VectorStoreScreen/reset'
        })
        yield put({
            type: 'VectorStoreEdit/reset'
        })
    }
}

function* retrieveStore(): any {

}

function* searchStore(): any {

}

function* removeStore(): any {

}

function* updateStore(): any {

}

function* closeScreen(): any {
    yield put({
        type: 'VectorStoreScreen/reset'
    })
    yield put({
        type: 'VectorStoreForm/reset'
    })
    yield put({
        type: 'VectorStoreEdit/reset'
    })
}