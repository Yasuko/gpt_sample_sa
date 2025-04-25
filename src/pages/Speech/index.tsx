import React from 'react-redux'
import { Provider } from 'react-redux'
import { createStore } from '../../_store/configureStore'
const store = createStore()

// import Component
import Header from '../Header'
import Speech from './Speech'

// import animation
import LoadingAnimation from '../animation/loading.animation'
import ToasterAnimation from '../animation/toaster.animation'

export const SpeechIndex = () => {
    return (
        <Provider store={store}>
            <Header />
            <div className="container">
                <Speech />
            </div>
            <LoadingAnimation />
            <ToasterAnimation />
        </Provider>
    )
}

export default SpeechIndex
