import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createStore } from '../../../../_store/configureStore';

import ChatFormTest from './chat.component';

afterEach(() => {
    cleanup();
});

const store = createStore();

/**
 * Chat Option Reducerのテスト。
 * 各テストケースでReduxの状態変更を検証します。
 */
describe('Chat Option Reducer Test', () => {
    /**
     * モデルを変更するテスト。
     * ボタンをクリックしてモデルが正しく変更されるか確認します。
     */
    test('Change Model', async () => {
        render(
            <Provider store={store}>
                <ChatFormTest />
            </Provider>
        );
        const user = userEvent.setup();
        await user.click(screen.getByText('setModel'));

        expect(screen.getByTestId('chat-model'))
        .toHaveTextContent('gpt-4')
    })
    /**
     * Temperatureを変更するテスト。
     * ボタンをクリックしてTemperatureが正しく変更されるか確認します。
     */
    test('Change Temperature', async () => {
        render(
            <Provider store={store}>
                <ChatFormTest />
            </Provider>
        );
        const user = userEvent.setup();
        await user.click(screen.getByText('setTemperature'));

        expect(screen.getByTestId('chat-temperature'))
        .toHaveTextContent('1.5')
    })
    /**
     * Top_pを変更するテスト。
     * ボタンをクリックしてTop_pが正しく変更されるか確認します。
     */
    test('Change Top_p', async () => {
        render(
            <Provider store={store}>
                <ChatFormTest />
            </Provider>
        );
        const user = userEvent.setup();
        await user.click(screen.getByText('setTop_p'));

        expect(screen.getByTestId('chat-top_p'))
        .toHaveTextContent('0.5')
    })
    /**
     * nを変更するテスト。
     * ボタンをクリックしてnが正しく変更されるか確認します。
     */
    test('Change n', async () => {
        render(
            <Provider store={store}>
                <ChatFormTest />
            </Provider>
        );
        const user = userEvent.setup();
        await user.click(screen.getByText('setN'));

        expect(screen.getByTestId('chat-n'))
        .toHaveTextContent('10')
    })
    /**
     * Streamを変更するテスト。
     * ボタンをクリックしてStreamが正しく変更されるか確認します。
     */
    test('Change Stream', async () => {
        render(
            <Provider store={store}>
                <ChatFormTest />
            </Provider>
        );
        const user = userEvent.setup();
        await user.click(screen.getByText('setStream'));

        expect(screen.getByTestId('chat-stream'))
        .toHaveTextContent('true')
    })
    /**
     * Stopを変更するテスト。
     * ボタンをクリックしてStopが正しく変更されるか確認します。
     */
    test('Change Stop', async () => {
        render(
            <Provider store={store}>
                <ChatFormTest />
            </Provider>
        );
        const user = userEvent.setup();
        await user.click(screen.getByText('setStop'));

        expect(screen.getByTestId('chat-stop'))
        .toHaveTextContent('any')
    })
    /**
     * MaxTokensを変更するテスト。
     * ボタンをクリックしてMaxTokensが正しく変更されるか確認します。
     */
    test('Change MaxTokens', async () => {
        render(
            <Provider store={store}>
                <ChatFormTest />
            </Provider>
        );
        const user = userEvent.setup();
        await user.click(screen.getByText('setMaxTokens'));

        expect(screen.getByTestId('chat-max_tokens'))
        .toHaveTextContent('2000')
    })
    /**
     * Presence Penaltyを変更するテスト。
     * ボタンをクリックしてPresence Penaltyが正しく変更されるか確認します。
     */
    test('Change Presence Penalty', async () => {
        render(
            <Provider store={store}>
                <ChatFormTest />
            </Provider>
        );
        const user = userEvent.setup();
        await user.click(screen.getByText('setPresencePenalty'));

        expect(screen.getByTestId('chat-presence_penalty'))
        .toHaveTextContent('2')
    })
    /**
     * Frequency Penaltyを変更するテスト。
     * ボタンをクリックしてFrequency Penaltyが正しく変更されるか確認します。
     */
    test('Change Frequency Penalty', async () => {
        render(
            <Provider store={store}>
                <ChatFormTest />
            </Provider>
        );
        const user = userEvent.setup();
        await user.click(screen.getByText('setFrequencyPenalty'));

        expect(screen.getByTestId('chat-frequency_penalty'))
        .toHaveTextContent('-2')
    })
    /**
     * Logit Biasを変更するテスト。
     * ボタンをクリックしてLogit Biasが正しく変更されるか確認します。
     */
    test('Change Logit Bias', async () => {
        render(
            <Provider store={store}>
                <ChatFormTest />
            </Provider>
        );
        const user = userEvent.setup();

        await user.click(screen.getByText('setLogitBias'));

        expect(screen.getByTestId('chat-logit_bias'))
        .toHaveTextContent('-50')
    })
})
