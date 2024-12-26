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
                                type     : 'RealtimeForm/setNewChat',
                                payload  : e.target.value
                            });
                        }}
                        />
                    <div
                        className='btn btn-info margin'
                        onClick={() => {
                            const t = document.getElementById('text1') as HTMLTextAreaElement
                            dispatch({
                                type: 'RealtimeAction/push',
                                payload: t.value
                            })
                            clear()
                        }}>
                        Send
                    </div>
                    <div
                        className='btn btn-secondary margin'
                        onClick={() => {
                            dispatch({
                                type: 'RealtimeForm/setNewChat',
                                payload: ''
                            })
                            clear()
                        }}>
                        Clear
                    </div>
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
                <Option />
            </div>
            <div className='col-8'>

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

export default Realtime
