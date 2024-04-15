import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import reducer
import {
    WhisperFormPropsInterface,
    WhisperFormInterface,
    initialState
} from '../../_domain/whisper/reducers/WhisperForm';

// import Hook

export const Option = (): JSX.Element => {
    const dispatch = useDispatch();    
    // コンテンツ表示Reducer呼び出し
    const wf = useSelector((state: WhisperFormPropsInterface): WhisperFormInterface => {
        return state.WhisperForm === undefined ? initialState : state.WhisperForm;
    });

    return (
        <div className='whisper-option'>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    model : 
                </div>
                <div className='whisper-option-content'>
                    <select
                    value={wf.options.model}
                    onChange={(e) => {
                        dispatch({
                            type    : 'WhisperForm/updateOption',
                            key     : 'model',
                            option  : e.target.value
                        })
                    }}>
                        <option value='tiny'>Tiny</option>
                        <option value='small'>Small</option>
                        <option value='basic'>Basic</option>
                        <option value='large'>Large</option>
                    </select>
                </div>
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    prompt : 
                </div>
                <div className='whisper-option-content'>
                    <input
                        type='text' value={wf.options.prompt} onChange={(e) => {
                        dispatch({
                            type    : 'WhisperForm/updateOption',
                            key     : 'prompt',
                            option  : e.target.value
                        })
                    }} />
                </div>
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    output_format : 
                </div>
                <div className='whisper-option-content'>
                    <select
                    value={wf.options.output_format}
                    onChange={(e) => {
                        dispatch({
                            type    : 'WhisperForm/updateOption',
                            key     : 'output_format',
                            option  : e.target.value
                        })
                    }}>
                        <option value='txt'>Text</option>
                        <option value='json'>Json</option>
                        <option value='srt'>SRT</option>
                        <option value='vtt'>VTT</option>
                        <option value='verbose_json'>VerboseJson</option>
                    </select>
                </div>
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    temperature : 
                </div>
                <div className='whisper-option-content'>
                    <input
                        type='number'
                        value={wf.options.temperature}
                        style={{width: '6em'}}
                        onChange={(e) => {
                        dispatch({
                            type    : 'WhisperForm/updateOption',
                            key     : 'temperature',
                            option  : e.target.value
                        })
                    }} />
                </div>
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    language : 
                </div>
                <div className='whisper-option-content'>
                    <input
                        type='text'
                        value={wf.options.language}
                        style={{width: '6em'}}
                        onChange={(e) => {
                        dispatch({
                            type    : 'WhisperForm/updateOption',
                            key     : 'language',
                            option  : e.target.value
                        })
                    }} />
                </div>
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    fp16 : 
                </div>
                <div className='whisper-option-content'>
                    <input
                        type='text'
                        value={wf.options.fp16}
                        style={{width: '6em'}}
                        onChange={(e) => {
                        dispatch({
                            type    : 'WhisperForm/updateOption',
                            key     : 'fp16',
                            option  : e.target.value
                        })
                    }} />
                </div>
            </div>
        </div>
    )
};

export default Option;
