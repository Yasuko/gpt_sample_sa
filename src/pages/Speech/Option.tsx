import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import reducer
import {
    SpeechFormPropsInterface,
    SpeechFormInterface,
    initialState
} from '../../_domain/speech/reducers/SpeechForm'

// import component


export const Option = (): JSX.Element => {
    const dispatch = useDispatch()
    // コンテンツ表示Reducer呼び出し
    const cf = useSelector((state: SpeechFormPropsInterface): SpeechFormInterface => {
        return state.SpeechForm === undefined ? initialState : state.SpeechForm
    })

    return (
        <div className='whisper-option'>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    voice : 
                </div>
                <div className='whisper-option-content'>
                    <select
                    value={cf.voice}
                    onChange={(e) => {
                        dispatch({
                            type    : 'SpeechForm/setVoice',
                            key     : 'model',
                            voice   : e.target.value
                        })
                    }}>
                        <option value='alloy'>alloy</option>
                        <option value='echo'>echo</option>
                        <option value='fable'>fable</option>
                        <option value='onyx'>onyx</option>
                        <option value='nova'>nova</option>
                        <option value='shimmer'>shimmer</option>
                    </select>
                </div>
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    responce_format : 
                </div>
                <div className='whisper-option-content'>
                    <select
                    value={cf.response_format}
                    onChange={(e) => {
                        dispatch({
                            type    : 'SpeechForm/setResponceFormat',
                            key     : 'model',
                            response_format  : e.target.value
                        })
                    }}>
                        <option value='mp3'>mp3</option>
                        <option value='opus'>opus</option>
                        <option value='aac'>aac</option>
                        <option value='flac'>flac</option>
                    </select>
                </div>
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    speed [{cf.speed}]:
                </div>
                <div className='whisper-option-content'>
                    <input
                        type='range'
                        defaultValue={cf.speed}
                        min={0.25}
                        max={4.0}
                        step={0.05}
                        onChange={(e) => {
                            dispatch({
                                type    : 'SpeechForm/setSpeed',
                                speech  : e.target.value
                            })
                    }} />
                </div>
            </div>
        </div>
    )
};

export default Option;
