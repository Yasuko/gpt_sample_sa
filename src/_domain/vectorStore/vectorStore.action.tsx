import { put, select, takeEvery } from 'redux-saga/effects'

// import animation
import { loadingShow, loadingHide } from '../animation/animation'

// import model
import {
    TokenPropsInterface
} from '../_all/reducers/Token'
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
import { FileHelper } from './helper/file.helper'

const Store = (state: VectorStorePropsInterface) => state.VectorStore
const StoreForm = (state: VectorStoreFormPropsInterface) => state.VectorStoreForm
const StoreEdit = (state: VectorStoreEditPropsInterface) => state.VectorStoreEdit

// Root Saga登録配列
export const RootVectorStoreAction = [
    takeEvery('VectorStorAction/initialLoad', initialLoad),
    takeEvery('VectorStorAction/newStore', newStore),
    takeEvery('VectorStorAction/retrieve', retrieveStore),
    takeEvery('VectorStorAction/search', searchStore),
    takeEvery('VectorStorAction/remove', removeStore),
    takeEvery('VectorStorAction/update', updateStore)
]

function* initialLoad(): any {

}

function* newStore(): any {

}

function* retrieveStore(): any {

}

function* searchStore(): any {

}

function* removeStore(): any {

}

function* updateStore(): any {

}