import React from 'react'
import { useDispatch } from 'react-redux'

// import reducer
import { RecordType } from '../../_domain/whisper/reducers/WhisperForm'

export type ShowTextProps = {
    state?      : any,
    recorder?   : RecordType[],
}

export const ShowRecorder = (state: ShowTextProps): JSX.Element => {
    const dispatch = useDispatch()
    if (state.recorder === undefined) {
        return <div></div>
    }
    
    const list = state.recorder.map((val, key): JSX.Element => {
        return (
        <div
            key={key}
            className='
                w-full h-20 m-2 p-2
                bg-gray-800 rounded-lg
            '>

            <div className='grid grid-cols-4 gap-4'>
                <div
                    className='col-span-2 cursor-pointer hover:bg-gray-700 rounded-lg'
                    onClick={() => {
                        dispatch({
                            type    : 'WhisperScreen/toggleShowText',
                        })
                        dispatch({
                            type        : 'WhisperShowText/set',
                            text        : val.text,
                            formation   : val.formation,
                            summary     : val.summary,
                            key         : key
                        })
                    }}>
                    <p className='
                        w-full mb-2
                        text-center
                        '>
                        {val.name}
                    </p>
                    <div className='flex'>
                        {txtCheck(val.text) ? grayBox('txt') : grayBox('txt', true)}
                        {txtCheck(val.formation) ? grayBox('for') : grayBox('for', true)}
                        {txtCheck(val.summary) ? grayBox('sum') : grayBox('sum', true)}
                        <div className='w-full text-center text-orange-500'>
                            { Math.floor(val.time * 100) / 100} sec
                        </div>
                    </div>
                </div>
                <div className='col-span-2 ml-6'>
                    <button
                        className="
                        m-1 py-1 px-3 inline-flex items-center gap-x-2
                        text-sm font-medium text-gray-200
                        rounded-lg 
                        bg-blue-700 
                        hover:bg-blue-800 focus:outline-none focus:bg-blue-800
                        disabled:opacity-50 disabled:pointer-events-none"
                        onClick={() => {
                            dispatch({
                                type    : 'VideoAction/encodeTest',
                                file    : val,
                                key     : key
                            })
                        }}
                        >Test</button>
                    <button
                        className="
                        m-1 py-1 px-3 inline-flex items-center gap-x-2
                        text-sm font-medium text-gray-200
                        rounded-lg
                        bg-blue-700 
                        hover:bg-blue-800 focus:outline-none focus:bg-blue-800
                        disabled:opacity-50 disabled:pointer-events-none"
                        onClick={() => {
                            dispatch({
                                type    : 'WhisperAction/characterization',
                                file    : val.rec,
                                key     : key
                            })
                        }}
                    >whis</button>
                    <button
                        className="
                            m-1 py-1 px-3 inline-flex items-center gap-x-2
                            text-sm font-medium text-gray-200
                            rounded-lg
                            bg-blue-700 
                            hover:bg-blue-800 focus:outline-none focus:bg-blue-800
                            disabled:opacity-50 disabled:pointer-events-none"
                        onClick={() => {
                            dispatch({
                                type    : 'AudioAction/split',
                                file    : val,
                                key     : key
                            })
                        }}
                        >split</button>
                    <button
                        className="
                            m-1 py-1 px-3 inline-flex items-center gap-x-2
                            text-sm font-medium text-gray-200
                            rounded-lg
                            bg-blue-700 
                            hover:bg-blue-800 focus:outline-none focus:bg-blue-800
                            disabled:opacity-50 disabled:pointer-events-none"
                        onClick={() => {
                            dispatch({
                                type    : 'AudioAction/encode',
                                file    : val,
                                key     : key,
                                extension: val.extension
                            })
                        }}
                        >MP3</button>
                    <button
                        className="
                            m-1 py-1 px-3 inline-flex items-center gap-x-2
                            text-sm font-medium text-gray-200
                            rounded-lg
                            bg-blue-700 
                            hover:bg-blue-800 focus:outline-none focus:bg-blue-800
                            disabled:opacity-50 disabled:pointer-events-none"
                        onClick={() => {
                            dispatch({
                                type    : 'AudioAction/download',
                                file    : val,
                                key     : key
                            })
                        }}
                        >DL</button>
                    <button
                        className="
                            m-1 py-1 px-3 inline-flex items-center gap-x-2
                            text-sm font-medium text-gray-200
                            rounded-lg
                            bg-blue-700 
                            hover:bg-blue-800 focus:outline-none focus:bg-blue-800
                            disabled:opacity-50 disabled:pointer-events-none"
                        onClick={() => {
                            dispatch({
                                type    : 'AudioAction/delRecorder',
                                key     : key
                            })
                        }}
                        >DEL</button>
                </div>
            </div>
        </div>
        )
    })
    return (
        <div className='
            w-full h-full
            ml-6
            grid grid-cols-1 gap-4
        '>
            { list }
            <video id='player'></video>
            <div id="ffmpeg-log"></div>
        </div>
    )

}

const grayBox = (text: string, toggle: boolean = false) => {
    const color = toggle ? 'green' : 'gray'
    const style = `
        w-[80px] h- ml-2 mr-2
        bg-${color}-500
        rounded-lg
        text-sm text-center
    `
    return (
        <div className={style}>{text}</div>
    )
}

const txtCheck = ( text: string | undefined ): boolean => {
    return (text === undefined || text === '') ? true : false
}

export default ShowRecorder
