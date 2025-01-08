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
    <div className='
            grid grid-rows-3 grid-cols-3 gap4
            w-full max-h-[95vh] 
        '>
        <div className="
            row-span-3
            grid
        ">
            <h1 className="
                text-4xl text-left
                text-gray-600
                ">Whisper</h1>
            <div
                id="File1b"
                className="
                m-4
                text-center leading-10 text-gray-500
                w-3/4 h-[200px] border border-gray-500 rounded
                "
                onDragOver={(e) => onDragStart(e, dispatch)}
                onDrop={(e) => onDragEnd(e, dispatch)}
            >
                Drag Area
            </div>
            <div className="">
                <button
                    id="File1b"
                    className='
                        w-12
                        mr-2 py-1 px-2 inline-flex items-center gap-x-2
                        text-sm font-medium text-white text-center
                        rounded-lg border border-transparent
                        bg-blue-600 
                        hover:bg-blue-700 focus:outline-none focus:bg-blue-700
                        disabled:opacity-50 disabled:pointer-events-none
                    '
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
                    className='
                        mr-2 py-1 px-2 inline-flex items-center gap-x-2
                        text-sm font-medium text-white
                        rounded-lg border border-transparent
                        bg-gray-600 
                        hover:bg-gray-700 focus:outline-none focus:bg-gray-700
                        disabled:opacity-50 disabled:pointer-events-none
                    '
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
                    className='
                    inline-flex items-center mx-2
                    text-sm font-medium text-orange-500
                    '
                    id='audio-timer'>
                    0
                </div>
                <audio id="whisper"></audio>
                <canvas
                    id="analyser_whisper"
                    className='
                        inline-flex
                        h-10 w-1/2
                        bg-gray-800
                        rounded
                    '></canvas>
            </div>
            <div className="">
                <button
                    id="File1b"
                    className='
                        w-12
                        mr-2 py-1 px-2 inline-flex items-center gap-x-2
                        text-sm font-medium text-white text-center
                        rounded-lg border border-transparent
                        bg-blue-600 
                        hover:bg-blue-700 focus:outline-none focus:bg-blue-700
                        disabled:opacity-50 disabled:pointer-events-none
                    '
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
                    className='
                        mr-2 py-1 px-2 inline-flex items-center gap-x-2
                        text-sm font-medium text-white
                        rounded-lg border border-transparent
                        bg-gray-600 
                        hover:bg-gray-700 focus:outline-none focus:bg-gray-700
                        disabled:opacity-50 disabled:pointer-events-none
                    '
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
                    className='
                        inline-flex items-center mx-2
                        text-sm font-medium text-orange-500
                    '
                    id='video-timer'>
                    0
                </div>
                <video
                    id="whisper-cam"
                    style={{width: '50px'}}>
                </video>
            </div>
            <Option />
        </div>

        <div className='row-span-3 col-span-2'>
            <ShowRecorder recorder={wf.recorder} />
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