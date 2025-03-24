import React, { JSX, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'

// import reducer
import {
    SpeechFormPropsInterface,
    SpeechFormInterface,
    initialState
} from '../../_domain/speech/reducers/SpeechForm'

// import component
import Option from './Option'

export const Speech = (): JSX.Element => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'TokenAction/checkToken',
            payload: { redirect: '/Speech' }
        })
    })

    const cf = useSelector((state: SpeechFormPropsInterface): SpeechFormInterface => {
        return state.SpeechForm === undefined ? initialState : state.SpeechForm
    })
    return (
        <div className='
            grid grid-rows-3 grid-cols-3 gap4
        '>
                <div className="row-span-3">
                    <h1 className="
                        text-4xl text-left
                        text-gray-600
                        ">Speech</h1>
                    <label className="sr-only" htmlFor="text1">Text</label>
                    <textarea
                        cols={80}
                        rows={6}
                        className="
                            w-full rounded m-4 mb-1 p-4
                            text-gray-500
                        "
                        id="text1"
                        placeholder="Input Sample"
                        defaultValue={cf.message}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            dispatch({
                                type     : 'SpeechForm/setMessage',
                                message  : e.target.value
                            })
                        }} />
                    <div
                        className='
                            ml-6 mr-4 py-2 px-4 inline-flex items-center gap-x-2
                            text-sm font-medium text-white
                            rounded-lg border border-transparent
                            bg-blue-600 
                            hover:bg-blue-700 focus:outline-none focus:bg-blue-700
                            disabled:opacity-50 disabled:pointer-events-none"
                        '
                        onClick={() => {
                            dispatch({
                                type: 'SpeechAction/sendSpeech'
                            })
                            clear()
                        }}>
                        Send
                    </div>
                    <div
                        className='
                            py-2 px-4 inline-flex items-center gap-x-2
                            text-sm font-medium text-gray-500
                            rounded-lg border border-gray-200
                            hover:border-blue-600 hover:text-blue-600
                            focus:outline-none focus:border-blue-600 focus:text-blue-600
                            disabled:opacity-50 disabled:pointer-events-none
                            dark:border-neutral-700 dark:text-neutral-400
                            dark:hover:text-blue-500 dark:hover:border-blue-600
                            dark:focus:text-blue-500 dark:focus:border-blue-600"
                        '
                        onClick={() => {
                            dispatch({
                                type     : 'SpeechForm/setMessage',
                                message  : ''
                            })
                            clear()
                        }}>
                        Clear
                    </div>

                <Option />
            </div>
            <div className='col-span-2 row-span-3'>
                { Result(cf, dispatch) }
            </div>
        </div>
    )
}

const clear = () => {
    const t = document.getElementById('text1') as HTMLTextAreaElement
    t.value = ''
}

const Result = (
    cf: SpeechFormInterface,
    dispatch: Dispatch
): JSX.Element => {
    if (cf.results === '') return (<div className='chat-list'>none</div>)

    const list = cf.results.map((val: any, i: number) => {
        return (
            <div className="list-group-item" key={i}>

                    { val.text }

                    <button
                        className='btn btn-primary margin'
                        onClick={() => {
                            dispatch({
                                type: 'SpeechAction/playSpeech',
                                audio: val.audio
                            })
                        }}>
                            再生
                    </button>

            </div>
        )
    })

    return (
        <ul className='list-group'>
            {list}
        </ul>
    )
}

export default Speech
