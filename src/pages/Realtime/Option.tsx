import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import reducer
import {
    RealtimeFormPropsInterface,
    RealtimeFormInterface,
    initialState
} from '../../_domain/realtime/reducers/RealtimeForm'

// import component
import CheckBox from '../_component/checkbox'

export const Option = (): JSX.Element => {
    const dispatch = useDispatch()
    // コンテンツ表示Reducer呼び出し
    const cf = useSelector((state: RealtimeFormPropsInterface): RealtimeFormInterface => {
        return state.RealtimeForm === undefined ? initialState : state.RealtimeForm
    })

    return (
        <div
            className='
                grid  grid-cols-2 gap4
                w-full
            '>
            <div className=''>
                modalities [{cf.SessionOptions.modalities}]:
            </div>
            <div className=''>
                <select
                    className="
                        py-3 px-4 pe-9 block w-full
                        border-gray-200 rounded-lg
                        text-sm
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600"
                    onChange={(e) => {
                        const v = [['text'], ['audio'], ['text', 'audio']]
                        const value = Number(e.target.value)
                        dispatch({
                            type    : 'RealtimeForm/setOptions',
                            payload : {
                                modalities: v[value]
                            }
                        })
                    }}>
                    <option selected value={0}>text</option>
                    <option value={1}>audio</option>
                    <option value={2}>text & audio</option>
                </select>
            </div>
            <div>
                model
            </div>
            <div>
                <select
                    className="
                        py-3 px-4 pe-9 block w-full
                        border-gray-200 rounded-lg
                        text-sm
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600"
                    onChange={(e) => {
                        dispatch({
                            type    : 'RealtimeForm/setOptions',
                            payload : {
                                model: e.target.value
                            }
                        })
                    }}>
                    <option selected value={'gpt-4o-realtime-preview-2024-12-17'}>gpt-4o-realtime-preview-2024-12-17</option>
                    <option value={'gpt-4o-mini-realtime-preview-2024-12-17'}>gpt-4o-mini-realtime-preview-2024-12-17</option>
                </select>
            </div>
            <div>
                instructions
            </div>
            <div>
                <textarea></textarea>
            </div>
            <div>
                voice
            </div>
            <div>
                <select
                    className="
                        py-3 px-4 pe-9 block w-full
                        border-gray-200 rounded-lg
                        text-sm
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600"
                    onChange={(e) => {
                        dispatch({
                            type    : 'RealtimeForm/setOptions',
                            payload : {
                                voice: e.target.value
                            }
                        })
                    }}>
                    <option selected value={'allow'}>allow</option>
                    <option value={'ash'}>ash</option>
                    <option value={'ballad'}>ballad</option>
                    <option value={'coral'}>coral</option>
                    <option value={'echo'}>echo</option>
                    <option value={'sage'}>sage</option>
                    <option value={'shimmer'}>shimmer</option>
                    <option value={'verse'}>verse</option>
                </select>
            </div>
            <div>
                input_audio_format
            </div>
            <div>
                <select
                    className="
                        py-3 px-4 pe-9 block w-full
                        border-gray-200 rounded-lg
                        text-sm
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600"
                    onChange={(e) => {
                        dispatch({
                            type    : 'RealtimeForm/setOptions',
                            payload : {
                                input_audio_format: e.target.value
                            }
                        })
                    }}>
                    <option selected value={'pcm16'}>pcm16</option>
                    <option value={'g711_ulaw'}>g711_ulaw</option>
                    <option value={'g711_alaw'}>g711_alaw</option>
                </select>
            </div>
            <div>
                output_audio_format
            </div>
            <div>
            <select
                    className="
                        py-3 px-4 pe-9 block w-full
                        border-gray-200 rounded-lg
                        text-sm
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600"
                    onChange={(e) => {
                        dispatch({
                            type    : 'RealtimeForm/setOptions',
                            payload : {
                                output_audio_format: e.target.value
                            }
                        })
                    }}>
                    <option selected value={'pcm16'}>pcm16</option>
                    <option value={'g711_ulaw'}>g711_ulaw</option>
                    <option value={'g711_alaw'}>g711_alaw</option>
                </select>
            </div>
            <div>
                turn_detection
            </div>
            <div>
                <div className='grid grdi-cols-2 '>
                    <div>threshold {cf.SessionOptions.turn_detection.threshold}</div>
                    <div>
                        <input
                            type='range'
                            defaultValue={cf.SessionOptions.turn_detection.threshold}
                            min={0.1}
                            max={1.0}
                            step={0.1}
                            onChange={(e) => {
                                dispatch({
                                    type    : 'RealtimeForm/setOptions',
                                    payload  : {
                                        turn_detection: {
                                            threshold: Number(e.target.value),
                                            prefix_padding_ms: cf.SessionOptions.turn_detection.prefix_padding_ms,
                                            silence_duration_ms: cf.SessionOptions.turn_detection.silence_duration_ms,
                                            create_response: cf.SessionOptions.turn_detection.create_response
                                        }
                                    }
                                })
                            }} />
                    </div>
                    <div> prefix_padding_ms {cf.SessionOptions.turn_detection.prefix_padding_ms } </div>
                    <div>
                        <input
                            type='range'
                            defaultValue={cf.SessionOptions.turn_detection.prefix_padding_ms}
                            min={0}
                            max={1000}
                            step={10}
                            onChange={(e) => {
                                dispatch({
                                    type    : 'RealtimeForm/setOptions',
                                    payload : {
                                        turn_detection: {
                                            threshold: cf.SessionOptions.turn_detection.threshold,
                                            prefix_padding_ms: Number(e.target.value),
                                            silence_duration_ms: cf.SessionOptions.turn_detection.silence_duration_ms,
                                            create_response: cf.SessionOptions.turn_detection.create_response
                                        }
                                    }
                                })
                            }} />
                    </div>
                    <div> silence_duration_ms {cf.SessionOptions.turn_detection.silence_duration_ms } </div>
                    <div>
                        <input
                            type='range'
                            defaultValue={cf.SessionOptions.turn_detection.silence_duration_ms}
                            min={0}
                            max={1000}
                            step={10}
                            onChange={(e) => {
                                dispatch({
                                    type    : 'RealtimeForm/setOptions',
                                    payload : {
                                        turn_detection: {
                                            threshold: cf.SessionOptions.turn_detection.threshold,
                                            prefix_padding_ms: cf.SessionOptions.turn_detection.prefix_padding_ms,
                                            silence_duration_ms: Number(e.target.value),
                                            create_response: cf.SessionOptions.turn_detection.create_response
                                        }
                                    }
                                })
                            }} />
                        </div>
                    <div> create_response {cf.SessionOptions.turn_detection.create_response} </div>
                    <div>
                        <input
                            type='checkbox'
                            defaultChecked={cf.SessionOptions.turn_detection.create_response}
                            onChange={(e) => {
                                dispatch({
                                    type    : 'RealtimeForm/setOptions',
                                    payload : {
                                        turn_detection: {
                                            threshold: cf.SessionOptions.turn_detection.threshold,
                                            prefix_padding_ms: cf.SessionOptions.turn_detection.prefix_padding_ms,
                                            silence_duration_ms: cf.SessionOptions.turn_detection.silence_duration_ms,
                                            create_response: e.target.checked
                                        }
                                    }
                                })
                            }} />
                    </div>
                </div>
            </div>
            <div>
                tools
            </div>
            <div>
                <CheckBox list={[{key: 'tools', value: 'tools'}]} next={'aaa'}/>
            </div>
            <div>
                tool_choice
            </div>
            <div>
                <select
                    className="
                        py-3 px-4 pe-9 block w-full
                        border-gray-200 rounded-lg
                        text-sm
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600"
                    onChange={(e) => {
                        dispatch({
                            type    : 'RealtimeForm/setOptions',
                            payload : {
                                tool_choice: e.target.value
                            }
                        })
                    }}>
                    <option selected value={'auto'}>auto</option>
                    <option value={'none'}>none</option>
                    <option value={'required'}>required</option>
                </select>
            </div>
            <div>
                temperature {cf.SessionOptions.temperature}
            </div>
            <div>
                <input
                    type='range'
                    defaultValue={cf.SessionOptions.temperature}
                    min={0.6}
                    max={1.2}
                    step={0.1}
                    onChange={(e) => {
                        dispatch({
                            type    : 'RealtimeForm/setOptions',
                            payload  : {
                                temperature: Number(e.target.value)
                            }
                        })
                    }} />
            </div>
            <div className="text-center">
                max_response_output_tokens
            </div>
            <div>
                <input
                className='
                    m-1 pb-1
                '
                    type='checkbox'
                    onChange={(e) => {
                        dispatch({
                            type    : 'RealtimeForm/setOptions',
                            payload : {
                                max_response_output_tokens: e.target.checked ? 'inf' : 4000
                            }
                        })
                    }} />
                <input
                    type='range'
                    defaultValue={cf.SessionOptions.max_response_output_tokens}
                    min={1}
                    max={4096}
                    step={10}
                    onChange={(e) => {
                        dispatch({
                            type    : 'RealtimeForm/setOptions',
                            payload  : {
                                max_response_output_tokens: Number(e.target.value)
                            }
                        })
                    }} />
            </div>
        </div>
    )
}

export default Option
