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
        <div className='grid grid-cols-2 gap4 w-full'>
            <GPT_Selector
                model={cf.options.model}
                next='ChatForm/setOptions'
            />
            <div className='m-2'>
                temperature [{cf.options.temperature}]:
            </div>
            <div className='m-2'>
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

            <div className='m-2'>
                top_p [{cf.options.top_p}]: 
            </div>
            <div className='m-2'>
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

            <div className='m-2'>
                n : 
            </div>
            <div className='m-2'>
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

            <div className='m-2'>
                stream : 
            </div>
            <div className='m-2'>
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

            <div className='m-2'>
                stop : 
            </div>
            <div className='m-2'>
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

            <div className='m-2'>
                max_tokens [{cf.options.max_tokens}]: 
            </div>
            <div className='m-2'>
                <input
                    type='range'
                    min={1}
                    max={12800}
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

            <div className='m-2'>
                presence_penalty [{cf.options.presence_penalty}]: 
            </div>
            <div className='m-2'>
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

            <div className='m-2'>
                frequency_penalty [{cf.options.frequency_penalty}]: : 
            </div>
            <div className='m-2'>
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

            <div className='m-2'>
                logit_bias [{cf.options.logit_bias}]: : 
            </div>
            <div className='m-2'>
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
    )
}

export default Option
