import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import helper

// import reducer
import {
    ChatFormPropsInterface,
    ChatFormInterface,
    initialState
} from '../../_domain/chat/reducers/ChatForm'

// import component
import Option from './Option'
import ChatList from './ChatList'
import { Dispatch } from '@reduxjs/toolkit'
import ChatScreen from './ChatScreen'

export const Chat = (): JSX.Element => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        dispatch({
            type: 'TokenAction/checkToken',
            return: 'Chat'
        })
    })

    const onClickOpen = () => {
        setOpen(true);
    }
    
    const onClickClose = () => {
        setOpen(false);
    }
    const cf = useSelector((state: ChatFormPropsInterface): ChatFormInterface => {
        return state.ChatForm === undefined ? initialState : state.ChatForm
    })
    return (
        <div className='
        flex flex-col lg:flex-row lg:flex-wrap
        w-svw max-h-[95vh] 
        '>
            <div
                className="
                    lg:flex-1 
                    hidden lg:flex items-center h-full px-2
                    transition duration-150 ease-in-out
                ">
                <div className='
                    grid grid-cols-1 w-full
                '>
                    <h1 className="
                        text-4xl text-left
                        text-gray-600
                        ">Chat</h1>
                    <Option />
                </div>
            </div>
            <div className="lg:hidden flex items-center h-14 w-full justify-between">
                { /* ハンバーガーボタン */ }
                <div className="flex px-3">
                { !open &&
                    <svg
                        onClick={onClickOpen}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 cursor-pointer"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        role="img"
                        viewBox="0 0 448 512">
                        <path
                            fill="currentColor"
                            d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                        ></path>
                    </svg>
                }
                { open &&
                    <svg
                        onClick={onClickClose}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 cursor-pointer"
                        viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414L10 8.586z" clipRule="evenodd" />
                    </svg>
                }
                { open && 
                    <div
                        className="
                            lg:hidden
                            absolute top-20 left-0 w-full
                            bg-gray-800 
                        ">
                        <Option />
                    </div>}
                </div>
            </div>
            <div 
                className="flex-1 ml-10 mr-16">
                <ChatScreen cf={cf.newChat} screen={cf.chatScreen} />
                <div className='
                    h-[55%] min-h-[400px] max-h-[500px]
                    overflow-y-auto overflow-x-hidden
                    '>
                    { ChatList(cf.chatBlock) }
                </div>
                <div className="flex-none">
                    <textarea
                        cols={70}
                        rows={4}
                        className="
                            w-full rounded m-4 mb-1 p-4
                            text-gray-500
                        "
                        id="text1"
                        placeholder="Input Sample"
                        defaultValue={
                            cf.newChat.content[0].type === 'text' 
                            ? cf.newChat.content[0].text 
                            : ''
                        }
                        onChange={(e) => {
                            dispatch({
                                type     : 'ChatForm/updateNewChat',
                                payload  : {
                                    content : [{
                                        type: 'text',
                                        text: e.target.value
                                    }],
                                    id: 0
                                }
                            })
                        }}
                        onDragOver={(e) => onDragStart(e, dispatch)}
                        onDrop={(e) => onDragEnd(e, dispatch)}
                        />
                    <button
                        className='
                        ml-6 mr-4 py-2 px-4 inline-flex items-center gap-x-2
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
                        py-2 px-4 inline-flex items-center gap-x-2
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


export default Chat
