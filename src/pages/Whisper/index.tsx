import React from 'react-redux';
import { Provider } from 'react-redux';
import { createStore } from '../../_store/configureStore';
const store = createStore();

// import Component
import Header from '../Header';
import Whisper from './Whisper';
import ShowText from './ShowText';

import LoadingAnimation from '../animation/loading.animation';

export const WhisperIndex = () => {
    return (
        <Provider store={store}>
            <Header />
            <div className="container">
                <Whisper />
                <LoadingAnimation />
            </div>
            <ShowText />
        </Provider>
    );
};

export default WhisperIndex;
