import React, { JSX, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'

// import helper

// import reducer
import {
    ChatAdvanceFormPropsInterface,
    ChatAdvanceFormInterface,
    initialState
} from '../../_domain/chatAdvance/reducers/ChatAdvanceForm'

// import component
import Option from './Option'
import ChatList from './ChatList'


export const ChatAdvance = (): JSX.Element => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'TokenAction/checkToken',
            return: 'Chat'
        })
    })
    const cf = useSelector((state: ChatAdvanceFormPropsInterface): ChatAdvanceFormInterface => {
        return state.ChatAdvanceForm === undefined ? initialState : state.ChatAdvanceForm
    })
    return (
        <div className='
        grid grid-rows-3 grid-cols-3 gap4
        w-full max-h-[95vh] 
        '>
            <div className="row-span-3">
                <h1 className="
                text-4xl text-left
                text-gray-600
                ">ChatAdvance</h1>
                <Option />
            </div>
            <div className='
            w-full
            mb-1
            col-span-2 row-span-2
            overflow-y-auto overflow-x-hidden
            '>
                { ChatList(cf.chatBlock) }
            </div>
            <div className="col-span-2">
                <label className="sr-only" htmlFor="text1">Text</label>
                <textarea
                    cols={70}
                    rows={4}
                    className="
                        w-full rounded m-4 mb-1 p-4
                        text-gray-500
                    "
                    id="text1"
                    placeholder="Input Sample"
                    defaultValue={cf.newChat}
                    onChange={(e) => {
                        dispatch({
                            type     : 'ChatForm/setNewChat',
                            newChat  : e.target.value
                        });
                    }}
                    onDragOver={(e) => onDragStart(e, dispatch)}
                    onDrop={(e) => onDragEnd(e, dispatch)}
                    />
                <button
                    className='
                    ml-6 mr-4 py-3 px-4 inline-flex items-center gap-x-2
                    text-sm font-medium text-white
                    rounded-lg border border-transparent
                    bg-blue-600 
                    hover:bg-blue-700 focus:outline-none focus:bg-blue-700
                    disabled:opacity-50 disabled:pointer-events-none
                    '
                    onClick={() => {
                        dispatch({
                            type: 'ChatAction/sendChat'
                        })
                        clear()
                    }}>
                    Send
                </button>
                <button
                    className='
                    py-3 px-4 inline-flex items-center gap-x-2
                    text-sm font-medium text-gray-500
                    rounded-lg border border-gray-200
                    hover:border-blue-600 hover:text-blue-600
                    focus:outline-none focus:border-blue-600 focus:text-blue-600
                    disabled:opacity-50 disabled:pointer-events-none
                    dark:border-neutral-700 dark:text-neutral-400
                    dark:hover:text-blue-500 dark:hover:border-blue-600
                    dark:focus:text-blue-500 dark:focus:border-blue-600
                    '
                    onClick={() => {
                        dispatch({
                            type: 'ChatForm/reset'
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


const onDragStart = (
    e: React.DragEvent | DragEvent,
    dispatch: Dispatch
): void => {
    e.preventDefault();
    dispatch({
        type    : 'ChatAction/dragStart',
        event   : e,
    })
}

const onDragEnd = (
    e: React.DragEvent | DragEvent,
    dispatch: Dispatch
): void => {
    e.preventDefault()
    
    dispatch({
        type    : 'ChatAction/dragEnd',
        event   : e,
    })
    e.stopPropagation()
}


export default ChatAdvance
