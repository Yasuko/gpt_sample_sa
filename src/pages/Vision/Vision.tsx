import React, { JSX, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import reducer
import {
    VisionFormPropsInterface,
    VisionFormInterface,
    initialState
} from '../../_domain/vision/reducers/VisionForm'

// import component
import Option from './Option'
import { Dispatch } from '@reduxjs/toolkit'

export const Vision = (): JSX.Element => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'TokenAction/checkToken',
            payload: {
                redirect: 'Chat'
            }
        })
    })

    const cf = useSelector((state: VisionFormPropsInterface): VisionFormInterface => 
        state.VisionForm === undefined ? initialState : state.VisionForm
    )
    return (
        <div className='
            w-full 
            grid grid-rows-3 grid-cols-3 grid-rows-3 gap4
        '>
                <div className="row-span-3">
                    <h1 className="
                        text-4xl text-left
                        text-gray-600
                        ">Vision</h1>
                    <label className="sr-only" htmlFor="text1">Text</label>
                    <div
                        id="File1b"
                        className="
                            m-4
                            text-center leading-10 text-gray-500
                            w-3/4 h-[200px] border border-gray-500 rounded
                        "
                        onDragOver={(e: React.DragEvent) => onDragStart(e, dispatch)}
                        onDrop={(e: React.DragEvent) => onDragEnd(e, dispatch)}
                    >
                        Drag Area
                    </div>
                <Option />
            </div>
            <div className='col-span-2 row-span-2 ml-6'>
                { Result(cf) }
            </div>
            <div className='col-span-2 ml-6'>
                <textarea
                    cols={80}
                    rows={4}
                    className="
                        w-full rounded m-4 mb-1 p-4
                        text-gray-500
                    "
                    id="text1"
                    placeholder="Input Sample"
                    defaultValue={cf.message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        dispatch({
                            type     : 'VisionForm/setMessage',
                            message  : e.target.value
                        });
                    }} />
                <button
                    className='
                    w-12
                    ml-6 mr-2 py-1 px-2 inline-flex items-center gap-x-2
                    text-sm font-medium text-white text-center
                    rounded-lg border border-transparent
                    bg-blue-600 
                    hover:bg-blue-700 focus:outline-none focus:bg-blue-700
                    disabled:opacity-50 disabled:pointer-events-none
                    '
                    onClick={() => {
                        dispatch({
                            type: 'VisionAction/sendVision'
                        })
                        clear()
                    }}>
                    Send
                </button>
                <button
                    className='
                    w-12
                    mr-2 py-1 px-2 inline-flex items-center gap-x-2
                    text-sm font-medium text-white
                    rounded-lg border border-transparent
                    bg-gray-600 
                    hover:bg-gray-700 focus:outline-none focus:bg-gray-700
                    disabled:opacity-50 disabled:pointer-events-none
                    '
                    onClick={() => {
                        dispatch({
                            type: 'VisionForm/reset'
                        })
                        clear()
                    }}>
                    Clear
                </button>
            </div>
        </div>
    )
}

const clear = () => {
    const t = document.getElementById('text1') as HTMLTextAreaElement
    t.value = ''
}

const Result = (cf: VisionFormInterface) => {
    if (cf.result === '') return (<div className='font-size-10'>none</div>)

    return (
        <div className=''>
            <div className="
                max-w-2xl ms-auto flex justify-end gap-x-2
                mt-4 sm:gap-x-4
            ">
                <div className="grow text-end space-y-3">
                    <div className="inline-block bg-gray-600 rounded-lg p-4 shadow-sm">
                        <pre className='text-sm text-white'>{cf.message}</pre>
                    </div>
                    <div className="inline-block bg-gray-600 rounded-lg p-4 shadow-sm">
                        <img src={cf.image} width={200} />
                    </div>
                </div>
                <span className="
                    shrink-0 inline-flex items-center justify-center
                    size-[38px] rounded-full bg-gray-600">
                    <span className="
                        text-sm font-medium text-white leading-none">
                        User
                    </span>
                </span>
            </div>
            <div className="flex gap-x-2 sm:gap-x-4 mt-4 ml-6">
                <span className="
                    shrink-0 inline-flex items-center justify-center
                    size-[38px] rounded-full bg-purple-600">
                    <span className="
                        text-sm font-medium text-white leading-none">
                        GPT
                    </span>
                </span>
                <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
                    <div className="inline-block bg-gray-600 rounded-lg p-4 shadow-sm">
                        <pre className='text-sm text-white'>{cf.result}</pre>
                    </div>
                </div>
            </div>
        </div>
    )
}

const onDragStart = (
    e: React.DragEvent,
    dispatch: Dispatch
): void => {
    e.preventDefault()
    dispatch({
        type    : 'VisionAction/dragStart',
        event   : e,
    })
}

const onDragEnd = (
    e: React.DragEvent,
    dispatch: Dispatch
): void => {
    e.preventDefault()
    
    dispatch({
        type    : 'VisionAction/dragEnd',
        event   : e,
    })
    e.stopPropagation()
}

export default Vision


