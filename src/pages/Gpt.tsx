import React from 'react'
import { Provider } from 'react-redux'

// import rootReducer from './reducers'
import { createStore } from '../_store/configureStore'

// import components
import WhisperIndex from './Whisper/index'
import SpeechIndex from './Speech/index'
import ChatIndex from './Chat/index'
import EmbedIndex from './Embed/index'
import ImageIndex from './Image/index'
import VisionIndex from './Vision'
import InputToken from './token/InputToken'

interface FaceInterface {
    page: string
}

const store = createStore()

const Gpt = (p: FaceInterface): JSX.Element => {

    return (
        <Provider store={store}>
            { changer(p.page) }
        </Provider>
    )
}

const changer = (p: string): JSX.Element => {
    if (p === '') return <ChatIndex />
    if (p === 'chat') return <ChatIndex />
    if (p === 'embed') return <EmbedIndex />
    if (p === 'whisper') return <WhisperIndex />
    if (p === 'speech') return <SpeechIndex />
    if (p === 'image') return <ImageIndex />
    if (p === 'vision') return <VisionIndex />
    if (p === 'token') return <InputToken />
    return <ChatIndex />
}

export default Gpt
