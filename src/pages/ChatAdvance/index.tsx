import React from 'react-redux'
import { Provider } from 'react-redux'
import { createStore } from '../../_store/configureStore'
const store = createStore()

// import Component
import Header from '../Header'
import ChatAdvance from './ChatAdvance'

// import animation
import LoadingAnimation from '../animation/loading.animation'
import ToasterAnimation from '../animation/toaster.animation'

export const ChatAdvanceIndex = () => {
    return (
        <Provider store={store}>
            <Header />
            <div className="container">
                <ChatAdvance />
            </div>
            <LoadingAnimation />
            <ToasterAnimation />
        </Provider>
    )
}

export default ChatAdvanceIndex
