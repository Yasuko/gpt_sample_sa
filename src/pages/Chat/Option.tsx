import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import reducer
import {
    ChatFormPropsInterface,
    ChatFormInterface,
    initialState
} from '../../_domain/chat/reducers/ChatForm'

// import component
import GPT_Selector from '../_component/gpt_selector'
import Tool_Editor from '../_component/tool_editor'

export const Option = (): JSX.Element => {
    const dispatch = useDispatch()
    // コンテンツ表示Reducer呼び出し
    const cf = useSelector((state: ChatFormPropsInterface): ChatFormInterface => {
        return state.ChatForm === undefined ? initialState : state.ChatForm
    })

    return (
        <div
            className='
                grid grid-cols-2 gap4 w-full h-[90vh]
                p-4
                overflow-y-auto overflow-x-hidden
            '>
            <GPT_Selector
                model={cf.options.model}
                next='ChatForm/setOptions'
            />

            <div className='leading-10 mt-1'>
                store : [{(cf.options.store) ? 'true' : 'false'}]
            </div>
            <div className=''>
                <input
                    className='
                        w-full mt-4 py-3 px-4 pe-9 block
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                        '
                    type='checkbox'
                    checked={cf.options.store}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ChatForm/setOptions',
                            key     : 'store',
                            option  : e.target.value
                        })
                    }}
                />
            </div>

            <div className='leading-10 mt-1'>
                reasoning_effort: [{cf.options.reasoning_effort}]
            </div>
            <div className=''>
                <select
                    className='
                        py-3 px-4 pe-9 block w-full
                        border-gray-200 rounded-lg
                        text-sm
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    value={cf.options.reasoning_effort}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ImageOption/setModel',
                            model   : e.target.value
                        })
                    }}
                    disabled={
                        (cf.options.model === 'o1-preview' || cf.options.model === 'o1-mini')
                        ? false
                        : true
                    }
                >
                    <option value='medium'>medium</option>
                    <option value='low'>low</option>
                    <option value='high'>high</option>
                </select>
            </div>

            <div className='leading-10 mt-1'>
                frequency_penalty [{cf.options.frequency_penalty}]:
            </div>
            <div className=''>
                <input
                    className='
                        py-3 px-4 block w-full
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    type='range'
                    min={-2.0}
                    max={2.0}
                    step={0.1}
                    defaultValue={cf.options.frequency_penalty}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ChatForm/setOptions',
                            key     : 'frequency_penalty',
                            option  : Number(e.target.value)
                        })
                    }}
                />
            </div>

            <div className='leading-10 mt-1'>
                logit_bias [{cf.options.logit_bias}]: : 
            </div>
            <div className=''>
                <input
                    className='
                        py-3 px-4 block w-full
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    type='range'
                    min={-100}
                    max={100}
                    step={1}
                    defaultValue={cf.options.logit_bias}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ChatForm/setOptions',
                            key     : 'logit_bias',
                            option  : e.target.value
                        })
                    }}
                />
            </div>

            <div className='leading-10 mt-1'>
                logprobs : [{(cf.options.logprobs) ? 'true' : 'false'}]
            </div>
            <div className=''>
                <input
                    className='
                        w-full mt-4 py-3 px-4 pe-9 block
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                        '
                    type='checkbox'
                    checked={cf.options.logprobs}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ChatForm/setOptions',
                            key     : 'logprobs',
                            option  : e.target.value
                        })
                    }}
                    disabled={
                        (cf.options.logit_bias === undefined || cf.options.logit_bias === null)
                        ? false
                        : true
                    }
                />
            </div>

            <div className='leading-10 mt-1'>
                top_logprobs [{cf.options.top_logprobs}]: : 
            </div>
            <div className=''>
                <input
                    className='
                        py-3 px-4 block w-full
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    type='range'
                    min={0}
                    max={20}
                    step={1}
                    defaultValue={cf.options.top_logprobs}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ChatForm/setOptions',
                            key     : 'top_logprobs',
                            option  : e.target.value
                        })
                    }}
                />
            </div>

            <div className='leading-10 mt-1'>
                max_completion_tokens [{cf.options.max_completion_tokens}]: 
            </div>
            <div className=''>
                <input
                    className='
                        py-3 px-4 block w-full
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    type='range'
                    min={1}
                    max={12800}
                    step={1}
                    defaultValue={cf.options.max_completion_tokens}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ChatForm/setOptions',
                            key     : 'max_completion_tokens',
                            option  : Number(e.target.value)
                        })
                    }}
                />
            </div>

            <div className='leading-10 mt-1'>
                n : [{cf.options.n}]
            </div>
            <div className=''>
                <input
                    className='
                    py-3 px-4 pe-9 block w-full
                    focus:border-blue-500 focus:ring-blue-500
                    disabled:opacity-50 disabled:pointer-events-none
                    dark:bg-neutral-900 dark:border-neutral-700
                    dark:text-neutral-400 dark:placeholder-neutral-500
                    dark:focus:ring-neutral-600
                    '
                    type='range'
                    min={1}
                    max={4}
                    step={1}
                    defaultValue={cf.options.n}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ChatForm/setOptions',
                            key     : 'n',
                            option  :Number(e.target.value)
                        })
                    }}
                />
            </div>

            <div className='leading-10 mt-1'>
                modalities: [{cf.options.modalities}]
            </div>
            <div className=''>
                <select
                    className='
                        py-3 px-4 pe-9 block w-full
                        border-gray-200 rounded-lg
                        text-sm
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    defaultValue={cf.options.modalities}
                    onChange={(e) => {
                        const v = [['text'], ['audio'], ['text', 'audio']]
                        dispatch({
                            type    : 'ImageOption/setModel',
                            key     : 'modalities',
                            option   : v[e.target.value]
                        })
                    }}
                >
                    <option value='0'>text</option>
                    <option value='1'>audio</option>
                    <option value='2'>text & audio</option>
                </select>
            </div>

            <div className='leading-10 mt-1'>
                prediction [{cf.options.prediction}]:
            </div>
            <div className=''>
                <input
                    className='
                        py-3 px-4 pe-9 block w-full
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    type='text'
                    defaultValue={cf.options.prediction}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ChatForm/setOptions',
                            key     : 'prediction',
                            option  : Number(e.target.value)
                        })
                }} />
            </div>

            <div className='leading-10 mt-1'>
                audio: [{cf.options.audio?.voice}] [{cf.options.audio?.format}]
            </div>
            <div className=''>
                <select
                    className='
                        py-3 px-4 pe-9 block w-full
                        border-gray-200 rounded-lg
                        text-sm
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    defaultValue={cf.options.audio?.voice}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ChatForm/setOptions',
                            key     : 'audio',
                            option   :{
                                ...cf.options.audio,
                                voice: e.target.value
                            }
                        })
                    }}
                    disabled={
                        (!cf.options.modalities || cf.options.modalities.includes('audio'))
                        ? false
                        : true
                    }
                >
                    <option value='ash'>ash</option>
                    <option value='ballad'>ballad</option>
                    <option value='coral'>coral</option>
                    <option value='sage'>sage</option>
                    <option value='verse'>verse</option>
                    <option value='alloy'>alloy</option>
                    <option value='echo'>echo</option>
                    <option value='shimmer'>shimmer</option>
                </select>
                <select
                    className='
                        py-3 px-4 pe-9 block w-full
                        border-gray-200 rounded-lg
                        text-sm
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    defaultValue={cf.options.audio?.format}
                    onChange={(e) => {
                        const v = [['text'], ['audio'], ['text', 'audio']]
                        dispatch({
                            type    : 'ChatForm/setOptions',
                            key     : 'audio',
                            option   :{
                                ...cf.options.audio,
                                format: e.target.value
                            }
                        })
                    }}
                >
                    <option value='wav'>wav</option>
                    <option value='mp3'>mp3</option>
                    <option value='flac'>flac</option>
                    <option value='opus'>opus</option>
                    <option value='pcm16'>pcm16</option>
                </select>
            </div>

            <div className='leading-10 mt-1'>
                presence_penalty [{cf.options.presence_penalty}]: 
            </div>
            <div className=''>
                <input
                    className='
                        py-3 px-4 block w-full
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    type='range'
                    min={-2.0}
                    max={2.0}
                    step={0.1}
                    defaultValue={cf.options.presence_penalty}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ChatForm/setOptions',
                            key     : 'presence_penalty',
                            option  : Number(e.target.value)
                        })
                    }}
                />
            </div>

            <div className='leading-10 mt-1'>
                responce_format [{cf.options.response_format}]: 
            </div>
            <div className=''>
                <input
                    className='
                        py-3 px-4 block w-full
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    type='text'
                    defaultValue={cf.options.response_format}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ChatForm/setOptions',
                            key     : 'responce_format',
                            option  : Number(e.target.value)
                        })
                    }}
                />
            </div>

            <div className='leading-10 mt-1'>
                seed [{cf.options.seed}]: 
            </div>
            <div className=''>
                <input
                    className='
                        py-3 px-4 pe-9 block w-full
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    type='range'
                    defaultValue={cf.options.seed}
                    min={0.0}
                    max={1.0}
                    step={0.1}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ChatForm/setOptions',
                            key     : 'seed',
                            option  : Number(e.target.value)
                        })
                    }}
                />
            </div>

            <div className='leading-10 mt-1'>
                service_tier : [{cf.options.service_tier}]
            </div>
            <div className=''>
 
            </div>

            <div className='leading-10 mt-1'>
                stop : 
            </div>
            <div className=''>
                <input
                    className='
                        py-3 px-4 pe-9 block w-full
                        border-gray-800 rounded-lg
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-gray-600 dark:border-gray-800
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    type='text'
                    defaultValue={cf.options.stop}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ChatForm/setOptions',
                            key     : 'stop',
                            option  : e.target.value
                        })
                    }}
                />
            </div>

            <div className='leading-10 mt-1'>
                stream : [{(cf.options.stream) ? 'true' : 'false'}]
            </div>
            <div className=''>
                <input
                    className='
                        w-full mt-4 py-3 px-4 pe-9 block
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                        '
                    type='checkbox'
                    checked={cf.options.stream}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ChatForm/setOptions',
                            key     : 'stream',
                            option  : e.target.value
                        })
                    }}
                />
            </div>

            <div className='leading-10 mt-1'>
                stream_options : [{cf.options.stream_options}]
            </div>
            <div className=''>
                <input
                    className='
                        w-full mt-4 py-3 px-4 pe-9 block
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                        '
                    type='checkbox'
                    checked={cf.options.stream_options}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ChatForm/setOptions',
                            key     : 'stream_options',
                            option  : e.target.value
                        })
                    }}
                />
            </div>

            <div className='leading-10 mt-1'>
                temperature [{cf.options.temperature}]:
            </div>
            <div className=''>
                <input
                    className='
                        py-3 px-4 pe-9 block w-full
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    type='range'
                    defaultValue={cf.options.temperature}
                    min={0.0}
                    max={2.0}
                    step={0.1}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ChatForm/setOptions',
                            key     : 'temperature',
                            option  : Number(e.target.value)
                        })
                }} />
            </div>

            <div className='leading-10 mt-1'>
                top_p [{cf.options.top_p}]: 
            </div>
            <div className=''>
                <input
                    className='
                        py-3 px-4 pe-9 block w-full
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    type='range'
                    defaultValue={cf.options.top_p}
                    min={0.0}
                    max={1.0}
                    step={0.1}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ChatForm/setOptions',
                            key     : 'top_p',
                            option  : Number(e.target.value)
                        })
                    }}
                />
            </div>

            <Tool_Editor />

            <div className='leading-10 mt-1'>
                tool_choice [{cf.options.tool_choice}]: 
            </div>
            <div className=''>
                <input
                    className='
                        py-3 px-4 pe-9 block w-full
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    type='text'
                    defaultValue={cf.options.tool_choice}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ChatForm/setOptions',
                            key     : 'tool_choice',
                            option  : Number(e.target.value)
                        })
                    }}
                />
            </div>

            <div className='leading-10 mt-1'>
                parallel_tool_calls [{cf.options.parallel_tool_calls}]: 
            </div>
            <div className=''>
                <input
                    className='
                        py-3 px-4 pe-9 block w-full
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    type='checkbox'
                    defaultValue={cf.options.parallel_tool_calls}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ChatForm/setOptions',
                            key     : 'parallel_tool_calls',
                            option  : Number(e.target.value)
                        })
                    }}
                />
            </div>

            <div className='leading-10 mt-1'>
                user [{cf.options.user}]: 
            </div>
            <div className=''>
                <input
                    className='
                        py-3 px-4 pe-9 block w-full
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    type='text'
                    defaultValue={cf.options.user}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ChatForm/setOptions',
                            key     : 'user',
                            option  : Number(e.target.value)
                        })
                    }}
                />
            </div>

        </div>
    )
}

export default Option
