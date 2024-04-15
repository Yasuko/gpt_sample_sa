import React from 'react';
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useDispatch } from 'react-redux'
import { Provider } from 'react-redux'
import { createStore } from '../../../../_store/configureStore'

import ShowText from '../../../../pages/Whisper/ShowText'

afterEach(() => {
    cleanup();
});

const store = createStore();

describe('Chat Option Reducer Test', () => {
    test('Change Model', async () => {
        const dispatch = useDispatch()
        render(
            <Provider store={store}>
                <ShowText />
            </Provider>
        );
        const user = userEvent.setup();
        await user.click(screen.getByText('setModel'));

        expect(screen.getByTestId('chat-model'))
        .toHaveTextContent('gpt-4')
    })
    test('Change Temperature', async () => {
        render(
            <Provider store={store}>
                <ShowText />
            </Provider>
        );
        const user = userEvent.setup();
        await user.click(screen.getByText('setTemperature'));

        expect(screen.getByTestId('chat-temperature'))
        .toHaveTextContent('1.5')
    })


})
