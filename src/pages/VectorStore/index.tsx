import React from 'react-redux'
import { Provider } from 'react-redux'
import { createStore } from '../../_store/configureStore'
const store = createStore()

// import Component
import Header from '../Header'
import VectorStore from './VectorStore'

// import animation
import LoadingAnimation from '../animation/loading.animation'
import ToasterAnimation from '../animation/toaster.animation'

export const VectorStoreIndex = () => {
    return (
        <Provider store={store}>
            <Header />
            <VectorStore />
            <LoadingAnimation />
            <ToasterAnimation />
        </Provider>
    )
}

export default VectorStoreIndex
