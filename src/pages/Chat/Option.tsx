import React, { JSX } from 'react'
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
        <div
            className='
                grid grid-cols-2 w-full h-[90vh]
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
                        checkImageModel(cf.options.model)
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
                    defaultValue={(cf.options.max_completion_tokens) ? cf.options.max_completion_tokens : 64}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ChatForm/setOptions',
                            key     : 'max_completion_tokens',
                            option  : Number(e.target.value)
                        })
                    }}
                />
            </div>


        </div>
    )
}

const checkImageModel = (model: string): boolean => {
    const models = [
        'o3',
        'o1',
        'o1-mini',
        'o1-small',
        'o1-medium',
        'o1-large',
        'gpt-4.1',
        'gpt-4.1-mini',
        'gpt-4.1-nano',
        'gpt-4o',
        'gpt-4o-mini'
    ]
    return models.includes(model)
}


export default Option
