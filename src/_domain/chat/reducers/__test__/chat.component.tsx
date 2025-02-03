import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChatFormPropsInterface, initialState } from '../ChatForm';

import {
    
} from './_test_data';

export const ChatFormTest = (): JSX.Element => {
    const dispatch = useDispatch();
    const cf = useSelector((state: ChatFormPropsInterface) => {
        return state.ChatForm === undefined ? initialState : state.ChatForm;
    });
    return (
        <div className="container">
            {/* modelを変更 */}
            <button
                onClick={() => {
                    dispatch({
                        type    : 'ChatForm/setOptions',
                        key     : 'model',
                        option  : 'gpt-4'
                    });
                }}
            >
                setModel
            </button>
            {/* Temperatureを変更 */}
            <button
                onClick={() => {
                    dispatch({
                        type    : 'ChatForm/setOptions',
                        key     : 'temperature',
                        option  : 1.5
                    });
                }}
            >
                setTemperature
            </button>
            {/* Top_pを変更 */}
            <button
                onClick={() => {
                    dispatch({
                        type    : 'ChatForm/setOptions',
                        key     : 'top_p',
                        option  : 0.5
                    });
                }}
            >
                setTop_p
            </button>
            {/* nを変更 */}
            <button
                onClick={() => {
                    dispatch({
                        type    : 'ChatForm/setOptions',
                        key     : 'n',
                        option  : 10
                    });
                }}
            >
                setN
            </button>
            {/* streamを変更 */}
            <button
                onClick={() => {
                    dispatch({
                        type    : 'ChatForm/setOptions',
                        key     : 'stream',
                        option  : true
                    });
                }}
            >
                setStream
            </button>
            {/* Stopを変更 */}
            <button
                onClick={() => {
                    dispatch({
                        type    : 'ChatForm/setOptions',
                        key     : 'stop',
                        option  : 'any'
                    });
                }}
            >
                setStop
            </button>
            {/* MaxTokensを変更 */}
            <button
                onClick={() => {
                    dispatch({
                        type    : 'ChatForm/setOptions',
                        key     : 'max_tokens',
                        option  : 2000
                    });
                }}
            >
                setMaxTokens
            </button>
            {/* PresencePenaltyを変更 */}
            <button
                onClick={() => {
                    dispatch({
                        type    : 'ChatForm/setOptions',
                        key     : 'presence_penalty',
                        option  : 2
                    });
                }}
            >
                setPresencePenalty
            </button>
            {/* FrequencyPenaltyを変更 */}
            <button
                onClick={() => {
                    dispatch({
                        type    : 'ChatForm/setOptions',
                        key     : 'frequency_penalty',
                        option  : -2
                    });
                }}
            >
                setFrequencyPenalty
            </button>
            {/* LogitBiasを変更 */}
            <button
                onClick={() => {
                    dispatch({
                        type    : 'ChatForm/setOptions',
                        key     : 'logit_bias',
                        option  : -50
                    });
                }}
            >
                setLogitBias
            </button>

            <div data-testid="chat-model">{String(cf.options.model)}</div>
            <div data-testid="chat-temperature">{String(cf.options.temperature)}</div>
            <div data-testid="chat-top_p">{String(cf.options.top_p)}</div>
            <div data-testid="chat-n">{String(cf.options.n)}</div>
            <div data-testid="chat-stream">{String(cf.options.stream)}</div>
            <div data-testid="chat-stop">{String(cf.options.stop)}</div>
            <div data-testid="chat-max_completion_tokens">{String(cf.options.max_completion_tokens)}</div>
            <div data-testid="chat-presence_penalty">{String(cf.options.presence_penalty)}</div>
            <div data-testid="chat-frequency_penalty">{String(cf.options.frequency_penalty)}</div>
            <div data-testid="chat-logit_bias">{String(cf.options.logit_bias)}</div>
        </div>
    );
};

export default ChatFormTest;
