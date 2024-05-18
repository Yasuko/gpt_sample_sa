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
import { ChatContent } from '../../_lib/gpt/_helper/chat.helper'
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
        <div className='container row'>
            <h4>Chat</h4>
            <br></br><br></br>
            <div className="col-4">

                <div className="container">
                    <label className="sr-only" htmlFor="text1">Text</label>
                    <textarea
                        cols={80}
                        rows={8}
                        className="form-control mb-2"
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
                    <div
                        className='btn btn-info margin'
                        onClick={() => {
                            dispatch({
                                type: 'ChatAction/sendChat'
                            })
                            clear()
                        }}>
                        Send
                    </div>
                    <div
                        className='btn btn-secondary margin'
                        onClick={() => {
                            dispatch({
                                type: 'ChatForm/reset'
                            })
                            clear()
                        }}>
                        Clear
                    </div>
                </div>
                <Option />
            </div>
            <div className='col-8'>
                { ChatList(cf) }
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
            <div key={key} className="chat-block">
                <div className='chat-content'>
                    <div className='chat-user'>
                        { val.role === 'user' ? 'User' : 'System' }
                    </div>
                    { ContentList(val.content) }
                </div>
            </div>
        )
    })
    return (
        <div className='chat-list'>
            {list}
        </div>
    )
}

const ContentList = (ct: ChatContent): JSX.Element => {
    const c = (ct.type === 'text') 
                ? <pre>{ct.text}</pre>
                : <img src={ct.image_url?.url} width={200} />
    return (
        <div className='chat-text'>
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
