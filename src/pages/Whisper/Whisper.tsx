import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import reducer
import {
    WhisperFormPropsInterface,
    WhisperFormInterface,
    initialState
} from '../../_domain/whisper/reducers/WhisperForm'

// import Component
import ShowRecorder from './ShowRecorder'

// import Hook
import VideoHook from '../_hook/video.hook'
import Option from './Option'

export const Whisper = (): JSX.Element => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'TokenAction/checkToken',
            return: 'Whisper'
        })
    })

    VideoHook({dispatch: 'WhisperAction/hook'})
    const wf = useSelector((state: WhisperFormPropsInterface): WhisperFormInterface => {
        return state.WhisperForm === undefined ? initialState : state.WhisperForm;
    })

    return (
    <div className='container row'>
        <div className="col-4">

            <div className="col-auto">
                <div className="form-group row">
                    <div
                        id="File1b"
                        className="drag-area center"
                        onDragOver={(e) => onDragStart(e, dispatch)}
                        onDrop={(e) => onDragEnd(e, dispatch)}
                    >
                        Drag Area
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col">
                        <button
                            id="File1b"
                            className='btn btn-sm btn-primary whisper-record-button'
                            disabled={flagCheck(wf.recAudio, wf.recVideo, 'audio', 'play')}
                            onClick={() => {
                                dispatch({
                                    type    : 'AudioAction/recorder'
                                })
                            }}
                        >
                            Rec
                        </button>
                        <button
                            id="File1b"
                            className='btn btn-sm btn-secondary whisper-record-button'
                            disabled={flagCheck(wf.recAudio, wf.recVideo, 'audio', 'stop')}
                            onClick={() => {
                                dispatch({
                                    type    : 'AudioAction/doneRecorder'
                                })
                            }}
                        >
                            Stop
                        </button>
                        <div
                            className='whisper-record-time'
                            id='audio-timer'>
                            0
                        </div>
                        <audio id="whisper"></audio>
                        <canvas
                            id="analyser_whisper"
                            className='whisper-visualise'></canvas>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col">
                            <button
                                id="File1b"
                                className='btn btn-sm btn-primary whisper-record-button'
                                disabled={flagCheck(wf.recAudio, wf.recVideo, 'video', 'play')}
                                onClick={() => {
                                    dispatch({
                                        type    : 'VideoAction/camera'
                                    })
                                }}
                            >
                                Mov
                            </button>
                            <button
                                id="File1b"
                                className='btn btn-sm btn-secondary whisper-record-button'
                                disabled={flagCheck(wf.recAudio, wf.recVideo, 'video', 'stop')}
                                onClick={() => {
                                    dispatch({
                                        type    : 'VideoAction/doneCamera'
                                    })
                                }}
                            >
                                Stop
                            </button>
                            <div
                                className='whisper-record-time'
                                id='video-timer'>
                                0
                            </div>
                            <video
                                id="whisper-cam"
                                style={{width: '50px'}}></video>
                        </div>
                    </div>
                    <Option />
                </div>
            </div>
            <div className='col-8'>
                { ShowRecorder(wf) }
            </div>
        </div>
    )
}

const onDragStart = (e: any, dispatch: any): void => {
    const _e = e as Event;
    _e.preventDefault();
    dispatch({
        type    : 'WhisperAction/DragStart',
        event   : _e,
    })
}

const onDragEnd = (e: any, dispatch: any): void => {
    const _e = e as Event;
    _e.preventDefault();
    
    dispatch({
        type    : 'WhisperAction/DragEnd',
        event   : _e,
    });
    _e.stopPropagation()
}

const flagCheck = (
    audio: boolean,
    video: boolean,
    target: 'audio' | 'video',
    button: 'play' | 'stop'
): boolean => {
    if (target === 'audio') {
        if (!audio && !video) return button === 'play' ? false : true
        if (audio && !video) return button === 'play' ? true : false
        if (!audio && video) return button === 'play' ? true : true
    } else {
        if (!audio && !video) return button === 'play' ? false : true
        if (audio && !video) return button === 'play' ? true : true
        if (!audio && video) return button === 'play' ? true : false
    }
    return false
}

export default Whisper