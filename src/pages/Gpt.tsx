import React, { JSX, useEffect } from 'react'
import { Provider } from 'react-redux'
import { useLocation } from 'react-router-dom';

import "preline/preline"
import { IStaticMethods } from "preline/preline"
declare global {
    interface Window {
        HSStaticMethods: IStaticMethods;
    }
}

// import rootReducer from './reducers'
import { createStore } from '../_store/configureStore'

// import components
import WhisperIndex from './Whisper/index'
import SpeechIndex from './Speech/index'
import ChatIndex from './Chat/index'
import ResponseIndex from './Response/index'
//import ChatAdvance from './ChatAdvance/index'
import EmbedIndex from './Embed/index'
import ImageIndex from './Image/index'
import TokenIndex from './token/index'
import RealtimeIndex from './Realtime/index'
import VideoIndex from './Video/index'
//import VectorStoreIndex from './VectorStore/index'
//import FileIndex from './File/index'

interface FaceInterface {
    page: string
}

// const store = createStore()

const Gpt = (p: FaceInterface): JSX.Element => {
    const location = useLocation()

    useEffect(() => {
        window.HSStaticMethods.autoInit()
    }, [location.pathname])

    return changer(p.page) 
}

const changer = (p: string): JSX.Element => {
    if (p === '') return <ChatIndex />
    if (p === 'response') return <ResponseIndex />
    if (p === 'chat') return <ChatIndex />
    if (p === 'embed') return <EmbedIndex />
    if (p === 'whisper') return <WhisperIndex />
    if (p === 'speech') return <SpeechIndex />
    if (p === 'image') return <ImageIndex />
    if (p === 'token') return <TokenIndex />
    if (p === 'realtime') return <RealtimeIndex />
    if (p === 'video') return <VideoIndex />
    return <ChatIndex />
}

export default Gpt
