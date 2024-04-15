import React from 'react';
import { render, screen, cleanup } from '@testing-library/react'
import { useDispatch } from 'react-redux'
import { Provider } from 'react-redux'
import { createStore } from '../../../_store/configureStore'

import ShowText from '../ShowText'

afterEach(() => {
    cleanup();
});

const store = createStore()
const dispatch = useDispatch()

describe('Show Text Test', () => {
    test('ShowContent', async () => {
        await dispatch({
            type: 'ShowContent/whisperShowText',
        })

        render(
            <Provider store={store}>
                <ShowText />
            </Provider>
        );

        expect(screen.getByTestId('whisper-text-download'))
        .toHaveTextContent('DL')
    })
    test('Change Temperature', async () => {
        dispatch({
            type: 'WhisperShowText/set',
            key: 0,
            text: 'test',
            formation: 'test',
            summary: 'test',
        })
        render(
            <Provider store={store}>
                <ShowText />
            </Provider>
        );

        expect(screen.getByTestId('whisper-showText-text'))
        .toHaveTextContent('test')
    })


})
