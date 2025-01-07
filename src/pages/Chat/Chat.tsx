import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import helper
import { isObjectEqual } from '../_helper/object_check'

// import reducer
import {
    ChatFormPropsInterface,
    ChatFormInterface,
    initialState
} from '../../_domain/chat/reducers/ChatForm'

// import component
import Option from './Option'
import { ChatContentType } from '../../_lib/gpt/_helper/chat.helper'
import { Dispatch } from '@reduxjs/toolkit'

export const Chat = (): JSX.Element => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'TokenAction/checkToken',
            return: 'Chat'
        })
    })
    const cf = useSelector((state: ChatFormPropsInterface): ChatFormInterface => {
        return state.ChatForm === undefined ? initialState : state.ChatForm
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
                ">Chat</h1>
                <Option />
            </div>
            <div className='
            w-full
            mb-1
            col-span-2 row-span-2
            overflow-y-auto overflow-x-hidden
            '>
                { ChatList(cf) }
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

const ChatList = (cf: ChatFormInterface) => {

    if (isObjectEqual(cf.chatBlock, initialState.chatBlock))
        return <div className='flex flex-row gap-4'>none</div>

    const list = cf.chatBlock.map((val, key) => {
        return (
            <div key={key} className="
            flex flex-row gap-4">
                { val.role === 'user' ? UserContent(val.content) : SystemContent(val.content) }
            </div>
        )
    })
    return (
        <div className=''>
            {list}
        </div>
    )
}

const UserContent = (ct: ChatContentType): JSX.Element => {
    return (
        <div className="
        max-w-2xl ms-auto flex justify-end gap-x-2
        mt-4 sm:gap-x-4
    ">
        <div className="grow text-end space-y-3">
            { ContentList(ct) }
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
    )
}

const SystemContent = (ct: ChatContentType): JSX.Element => {
    return (
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
                { ContentList(ct) }
            </div>
        </div>
    )
}

const ContentList = (ct: ChatContentType): JSX.Element => {
    const c = (ct.type === 'text') 
                ? (
                <div className="inline-block bg-gray-600 rounded-lg p-4 shadow-sm">
                    <pre className='text-sm text-white'>{ct.text}</pre>
                </div>
                )
                : (
                <div className="inline-block bg-gray-600 rounded-lg p-4 shadow-sm">
                    <img src={ct.image_url?.url} width={200} />
                </div>
                )
    return (
        <div className=''>
            {c}
        </div>
    )
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


export default Chat
