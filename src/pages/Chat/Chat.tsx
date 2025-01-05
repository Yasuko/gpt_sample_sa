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
        <div className='grid grid-rows-3 grid-cols-3 gap4'>
            <div className="row-span-3">
                <Option />
            </div>
            <div className='col-span-2 row-span-2'>
                { ChatList(cf) }
            </div>
            <div className="col-span-2">
                <label className="sr-only" htmlFor="text1">Text</label>
                <textarea
                    cols={80}
                    rows={8}
                    className="
                        w-full rounded m-4
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
                    mr-4 py-3 px-4 inline-flex items-center gap-x-2
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
    if (isObjectEqual(cf.chatBlock, initialState.chatBlock)) return (<div className='chat-list'>none</div>)
    const list = cf.chatBlock.map((val, key) => {
        return (
            <div key={key} className="">
                <div className=''>
                    <div className=''>
                        { val.role === 'user' ? 'User' : 'System' }
                    </div>
                    { ContentList(val.content) }
                </div>
            </div>
        )
    })
    return (
        <div className=''>
            {list}
        </div>
    )
}

const ContentList = (ct: ChatContentType): JSX.Element => {
    const c = (ct.type === 'text') 
                ? <pre>{ct.text}</pre>
                : <img src={ct.image_url?.url} width={200} />
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
