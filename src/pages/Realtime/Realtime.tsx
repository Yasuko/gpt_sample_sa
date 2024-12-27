import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import helper
import { isObjectEqual } from '../_helper/object_check'

// import reducer
import {
    RealtimeFormPropsInterface,
    RealtimeFormInterface,
    initialState
} from '../../_domain/realtime/reducers/RealtimeForm'

// import component
import Option from './Option'
import { ChatContentType } from '../../_lib/gpt/_helper/chat.helper'

export const Realtime = (): JSX.Element => {
    const dispatch = useDispatch();

    const cf = useSelector((state: RealtimeFormPropsInterface): RealtimeFormInterface => {
        return state.RealtimeForm === undefined ? initialState : state.RealtimeForm
    })
    return (
        <div className='grid grid-rows-3 grid-cols-3 gap4'>
            <div className="row-span-3">
                <div className="container">
                    <div
                        className='btn btn-info margin'
                        onClick={() => {
                            dispatch({
                                type: 'RealtimeAction/connection',
                            })
                        }}>
                        Connet
                    </div>
                    <div
                        className='btn btn-info margin'
                        onClick={() => {
                                dispatch({
                                    type: 'RealtimeAction/close',
                                })
                        }}>
                        close
                    </div>
                </div>
                <audio id='realtime_server' autoPlay={true}></audio>
                <label
                    className="text-gray-500 text-sm"
                    htmlFor="analyser_realtime_server">server audio</label>
                <canvas
                    id="analyser_realtime_server"
                    className='border border-gray-500 rounded m-4 mt-1 mb-1'
                    width={350}
                    height={50}>
                </canvas>
                <audio id='realtime_client'></audio>
                <label
                    className="text-gray-500 text-sm"
                    htmlFor="analyser_realtime_server">client audio</label>
                <canvas
                    id="analyser_realtime_client"
                    className='border border-gray-500 rounded m-4 mt-1'
                    width={350}
                    height={50}>
                </canvas>
                <Option />
            </div>
            <div className='col-span-2 row-span-2'>
                <div
                    id="realtime-message">
                </div>
            </div>
            <div className='col-span-2'>
                <label className="sr-only" htmlFor="text1">Text</label>
                <textarea
                    cols={80}
                    rows={8}
                    className="
                        w-full
                        rounded m-4
                        "
                    id="text1"
                    placeholder="Input Sample"
                    defaultValue={cf.newChat}
                    onChange={(e) => {
                        dispatch({
                            type     : 'RealtimeForm/setNewChat',
                            payload  : e.target.value
                        });
                    }}
                    />
                <div className="ms-4">

                    <button
                        type="button"
                        className="
                            mr-4 py-3 px-4 inline-flex items-center gap-x-2
                            text-sm font-medium text-white
                            rounded-lg border border-transparent
                            bg-blue-600 
                            hover:bg-blue-700 focus:outline-none focus:bg-blue-700
                            disabled:opacity-50 disabled:pointer-events-none"
                        onClick={() => {
                            const t = document.getElementById('text1') as HTMLTextAreaElement
                            dispatch({
                                type: 'RealtimeAction/push',
                                payload: t.value
                            })
                            clear()
                        }}>
                        Send
                    </button>
                    <button
                        type="button"
                        className="
                            py-3 px-4 inline-flex items-center gap-x-2
                            text-sm font-medium text-gray-500
                            rounded-lg border border-gray-200
                            hover:border-blue-600 hover:text-blue-600
                            focus:outline-none focus:border-blue-600 focus:text-blue-600
                            disabled:opacity-50 disabled:pointer-events-none
                            dark:border-neutral-700 dark:text-neutral-400
                            dark:hover:text-blue-500 dark:hover:border-blue-600
                            dark:focus:text-blue-500 dark:focus:border-blue-600"
                        onClick={() => {
                            dispatch({
                                type: 'RealtimeForm/setNewChat',
                                payload: ''
                            })
                            clear()
                        }}>
                        Clear
                    </button>
                </div>
            </div>
        </div>
    )
}

const clear = () => {
    const t = document.getElementById('text1') as HTMLTextAreaElement
    t.value = ''
}

export default Realtime
