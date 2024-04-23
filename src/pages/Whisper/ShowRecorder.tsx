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
            className='whisper-rec-list'>

            <div className='whisper-rec-list-cell'>
                <div
                    className='whisper-rec-list-content whisper-rec-list-name'
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
                    {val.name}<br></br>
                    {txtCheck(val.text) ? grayBox('txt') : grayBox('txt', true)}
                    {txtCheck(val.formation) ? grayBox('for') : grayBox('for', true)}
                    {txtCheck(val.summary) ? grayBox('sum') : grayBox('sum', true)}
                </div>
                <div className='whisper-rec-list-content whisper-rec-list-time'>
                    { Math.floor(val.time * 100) / 100} sec
                </div>
                <div className='whisper-rec-list-content whisper-rec-control whisper-rec-list-button'>
                    <div
                        className='btn btn-sm btn-primary'
                        onClick={() => {
                            dispatch({
                                type    : 'VideoAction/encodeTest',
                                file    : val,
                                key     : key
                            })
                        }}
                        >Tes</div>
                    <div
                        className='btn btn-sm btn-primary'
                        onClick={() => {
                            dispatch({
                                type    : 'WhisperAction/characterization',
                                file    : val.rec,
                                key     : key
                            })
                        }}
                    >whis</div>
                    <div
                        className='btn btn-sm btn-primary'
                        onClick={() => {
                            dispatch({
                                type    : 'AudioAction/split',
                                file    : val,
                                key     : key
                            })
                        }}
                        >split</div>
                    <div
                        className='btn btn-sm btn-primary'
                        onClick={() => {
                            dispatch({
                                type    : 'AudioAction/encode',
                                file    : val,
                                key     : key,
                                extension: val.extension
                            })
                        }}
                        >MP3</div>
                    <div
                        className='btn btn-sm btn-primary'
                        onClick={() => {
                            dispatch({
                                type    : 'AudioAction/download',
                                file    : val,
                                key     : key
                            })
                        }}
                        >DL</div>
                    <div
                        className='btn btn-sm btn-primary'
                        onClick={() => {
                            dispatch({
                                type    : 'AudioAction/delRecorder',
                                key     : key
                            })
                        }}
                        >DEL</div>
                </div>
            </div>
        </div>
        )
    })
    return (
        <div className='whisper-rec-box'>
            { list }
            <video id='player'></video>
            <div id="ffmpeg-log"></div>
        </div>
    )

}

const grayBox = (text: string, toggle: boolean = false) => {
    const color = toggle ? 'green' : 'gray'

    return (
        <div className={'whisper-rec-' + color +'-box whisper-rec-result-box'}>{text}</div>
    )
}

const txtCheck = ( text: string | undefined ): boolean => {
    return (text === undefined || text === '') ? true : false
}

export default ShowRecorder
