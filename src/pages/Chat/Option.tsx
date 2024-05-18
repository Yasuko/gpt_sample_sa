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

export const Option = (): JSX.Element => {
    const dispatch = useDispatch()
    // コンテンツ表示Reducer呼び出し
    const cf = useSelector((state: ChatFormPropsInterface): ChatFormInterface => {
        return state.ChatForm === undefined ? initialState : state.ChatForm
    })

    return (
        <div className='whisper-option'>
            <div className='whisper-option-cell'>
                <GPT_Selector
                    model={cf.options.model}
                    next='ChatForm/setOptions'
                />
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    temperature [{cf.options.temperature}]:
                </div>
                <div className='whisper-option-content'>
                    <input
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
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    top_p [{cf.options.top_p}]: 
                </div>
                <div className='whisper-option-content'>
                    <input
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
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    n : 
                </div>
                <div className='whisper-option-content'>
                    <input
                        type='text'
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
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    stream : 
                </div>
                <div className='whisper-option-content'>
                    <input
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
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    stop : 
                </div>
                <div className='whisper-option-content'>
                    <input
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
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    max_tokens [{cf.options.max_tokens}]: 
                </div>
                <div className='whisper-option-content'>
                    <input
                        type='range'
                        min={1}
                        max={3000}
                        step={1}
                        defaultValue={cf.options.max_tokens}
                        onChange={(e) => {
                            dispatch({
                                type    : 'ChatForm/setOptions',
                                key     : 'max_tokens',
                                option  : Number(e.target.value)
                            })
                        }}
                    />
                </div>
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    presence_penalty [{cf.options.presence_penalty}]: 
                </div>
                <div className='whisper-option-content'>
                    <input
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
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    frequency_penalty [{cf.options.frequency_penalty}]: : 
                </div>
                <div className='whisper-option-content'>
                    <input
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
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    logit_bias [{cf.options.logit_bias}]: : 
                </div>
                <div className='whisper-option-content'>
                    <input
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
            </div>

        </div>
    )
}

export default Option
