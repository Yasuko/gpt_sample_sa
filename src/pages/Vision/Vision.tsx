import React, { useEffect } from 'react'
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
            return: 'Chat'
        })
    })

    const cf = useSelector((state: VisionFormPropsInterface): VisionFormInterface => {
        return state.VisionForm === undefined ? initialState : state.VisionForm
    })
    return (
        <div className='container row'>
            <h4>Vision</h4>
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
                        defaultValue={cf.message}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            dispatch({
                                type     : 'VisionForm/setMessage',
                                message  : e.target.value
                            });
                        }} />
                    <div className="form-group row">
                        <div
                            id="File1b"
                            className="drag-area center"
                            onDragOver={(e: React.DragEvent) => onDragStart(e, dispatch)}
                            onDrop={(e: React.DragEvent) => onDragEnd(e, dispatch)}
                        >
                            Drag Area
                        </div>
                    </div>
                    <div
                        className='btn btn-info margin'
                        onClick={() => {
                            dispatch({
                                type: 'VisionAction/sendVision'
                            })
                            clear()
                        }}>
                        Send
                    </div>
                    <div
                        className='btn btn-secondary margin'
                        onClick={() => {
                            dispatch({
                                type: 'VisionForm/reset'
                            })
                            clear()
                        }}>
                        Clear
                    </div>
                </div>
                <Option />
            </div>
            <div className='col-8'>
                { Result(cf) }
            </div>
        </div>
    )
}

const clear = () => {
    const t = document.getElementById('text1') as HTMLTextAreaElement
    t.value = ''
}

const Result = (cf: VisionFormInterface) => {
    if (cf.result === '') return (<div className='chat-list'>none</div>)

    return (
        <div className='chat-list'>
            <div className="chat-block">
                <div className='chat-content'>
                    <div className='chat-user'>
                        user
                    </div>
                    <div className='chat-text'>
                        <pre>{cf.message}</pre>
                    </div>
                    <div className='chat-text'>
                        <img src={cf.image} width={200} />
                    </div>
                </div>
            </div>
            <div className="chat-block">
                <div className='chat-content'>
                    <div className='chat-user'>
                        system
                    </div>
                    <div className='chat-text'>
                        <pre>{cf.result}</pre>
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


