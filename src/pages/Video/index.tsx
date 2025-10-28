import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from '../../_store/configureStore'
const store = createStore()

// import Component
import Header from '../Header'
import File from './Video'

// import animation
import LoadingAnimation from '../animation/loading.animation'
import ToasterAnimation from '../animation/toaster.animation'

export const VideoIndex = () => {
  return (
    <Provider store={store}>
      <Header />
      <div className="container">
        <File />
      </div>
      <LoadingAnimation />
      <ToasterAnimation />
    </Provider>
  )
}

export default VideoIndex
