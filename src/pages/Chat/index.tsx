import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from '../../_store/configureStore'
const store = createStore()

// import Component
import Header from '../Header'
import Chat from './Chat'
import TokenCounter from '../_component/token_counter'

// import animation
import LoadingAnimation from '../animation/loading.animation'
import ToasterAnimation from '../animation/toaster.animation'

export const ChatIndex = () => {
    return (
        <Provider store={store}>
            <Header />
            <Chat />
            <LoadingAnimation />
            <ToasterAnimation />
            <TokenCounter />
        </Provider>
    )
}

export default ChatIndex
