import React from 'react-redux';
import { Provider } from 'react-redux';
import { createStore } from '../../_store/configureStore';
const store = createStore();

// import Component
import InputToken from './InputToken';

export const TokenIndex = () => {
    return (
        <Provider store={store}>
            <InputToken />
        </Provider>
    );
};

export default TokenIndex
