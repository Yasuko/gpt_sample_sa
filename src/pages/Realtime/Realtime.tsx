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

    useEffect(() => {
        dispatch({
            type: 'RealtimeAction/checkToken',
            return: 'Stream'
        })

    })
    const cf = useSelector((state: RealtimeFormPropsInterface): RealtimeFormInterface => {
        return state.RealtimeForm === undefined ? initialState : state.RealtimeForm
    })
    return (
        <div className='container row'>
            <h4>Stream</h4>
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
                        />
                    <div
                        className='btn btn-info margin'
                        onClick={() => {
                            dispatch({
                                type: 'RealtimeAction/connection'
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
                    </div>                    <div
                        className='btn btn-info margin'
                        onClick={() => {
                            dispatch({
                                type: 'StreamAction/setCallback',
                                callback: (data: ChatContentType) => {
                                    dispatch({
                                        type: 'StreamAction/returnResponse',
                                        response: data
                                    })
                                }
                            })
                        }}>
                        Connet
                    </div>
                </div>
            </div>
            <div className='col-8'>
                { ChatList(cf) }
                <div
                    id="realtime-message">

                </div>
            </div>
        </div>
    )
}

const clear = () => {
    const t = document.getElementById('text1') as HTMLTextAreaElement
    t.value = ''
}

const ChatList = (cf: RealtimeFormInterface) => {
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

const ContentList = (ct: ChatContentType): JSX.Element => {
    const c = (ct.type === 'text') 
                ? <pre>{ct.text}</pre>
                : <img src={ct.image_url?.url} width={200} />
    return (
        <div className='chat-text'>
            {c}
        </div>
    )
}


export default Realtime
