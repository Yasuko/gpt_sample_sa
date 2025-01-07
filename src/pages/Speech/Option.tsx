import React from 'react';
import { useDispatch, useSelector } from 'react-redux'

// import reducer
import {
    SpeechFormPropsInterface,
    SpeechFormInterface,
    initialState
} from '../../_domain/speech/reducers/SpeechForm'

// import component


export const Option = (): JSX.Element => {
    const dispatch = useDispatch()
    // コンテンツ表示Reducer呼び出し
    const cf = useSelector((state: SpeechFormPropsInterface): SpeechFormInterface => {
        return state.SpeechForm === undefined ? initialState : state.SpeechForm
    })

    return (
        <div 
            className='
                grid  grid-cols-2 gap4
                w-full
            '>

            <div className='leading-10 mt-1 ml-6'>
                voice : 
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
                    value={cf.voice}
                    onChange={(e) => {
                        dispatch({
                            type    : 'SpeechForm/setVoice',
                            key     : 'model',
                            voice   : e.target.value
                        })
                    }}>
                    <option value='alloy'>alloy</option>
                    <option value='echo'>echo</option>
                    <option value='fable'>fable</option>
                    <option value='onyx'>onyx</option>
                    <option value='nova'>nova</option>
                    <option value='shimmer'>shimmer</option>
                </select>
            </div>

            <div className='leading-10 mt-1 ml-6'>
                responce_format : 
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
                    value={cf.response_format}
                    onChange={(e) => {
                        dispatch({
                            type    : 'SpeechForm/setResponceFormat',
                            key     : 'model',
                            response_format  : e.target.value
                        })
                    }}>
                    <option value='mp3'>mp3</option>
                    <option value='opus'>opus</option>
                    <option value='aac'>aac</option>
                    <option value='flac'>flac</option>
                </select>
            </div>

            <div className='leading-10 mt-1 ml-6'>
                speed [{cf.speed}]:
            </div>
            <div className=''>
                <input
                    className='
                        py-3 px-4 pe-9 block w-full
                        text-sm
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    type='range'
                    defaultValue={cf.speed}
                    min={0.25}
                    max={4.0}
                    step={0.05}
                    onChange={(e) => {
                        dispatch({
                            type    : 'SpeechForm/setSpeed',
                            speech  : e.target.value
                        })
                }} />
            </div>

        </div>
    )
}

export default Option
