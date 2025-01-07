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
        <div className='grid grid-cols-2 gap4 w-full'>
            <div className='leading-10 mt-1'>
                model [{wf.options.model}] : 
            </div>
            <div className=''>
                <select
                    className='py-3 px-4 pe-9 block w-full
                        text-sm
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600'
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
            <div className='leading-10 mt-1'>
                prompt : 
            </div>
            <div className=''>
                <textarea
                    cols={70}
                    rows={4}
                    className="
                        w-full rounded m-2 mb-1 p-4
                        text-gray-500
                    "
                    id="whisper-prompt"
                    placeholder="Input Whisper Prompt"
                    defaultValue={wf.options.prompt}
                    onChange={(e) => {
                        dispatch({
                            type    : 'WhisperForm/updateOption',
                            key     : 'prompt',
                            option  : e.target.value
                        })
                    }} />
            </div>
            <div className='leading-10 mt-1'>
                output_format [{wf.options.output_format}] : 
            </div>
            <div className=''>
                <select
                    className='py-3 px-4 pe-9 block w-full
                        text-sm
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600'
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

            <div className='leading-10 mt-1'>
                temperature [{wf.options.temperature}] : 
            </div>
            <div className=''>
                <input
                    className='
                        py-3 px-4 block w-full
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    type='range'
                    min={0.1}
                    max={1.0}
                    step={0.1}
                    value={wf.options.temperature}
                    onChange={(e) => {
                    dispatch({
                        type    : 'WhisperForm/updateOption',
                        key     : 'temperature',
                        option  : e.target.value
                    })
                }} />
            </div>

            <div className='leading-10 mt-1'>
                language [{wf.options.language}] : 
            </div>
            <div className=''>
                <select
                    className='py-3 px-4 pe-9 block w-full
                        text-sm
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600'
                    value={wf.options.output_format}
                    onChange={(e) => {
                        dispatch({
                            type    : 'WhisperForm/updateOption',
                            key     : 'language',
                            option  : e.target.value
                        })
                    }}>
                    <option value='ja'>Japanese</option>
                    <option value='en'>English</option>
                </select>
            </div>

            <div className='leading-10 mt-1'>
                fp16 : 
            </div>
            <div className=''>
                <select
                    className='py-3 px-4 pe-9 block w-full
                        text-sm
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600'
                    value={wf.options.fp16}
                    onChange={(e) => {
                        dispatch({
                            type    : 'WhisperForm/updateOption',
                            key     : 'fp16',
                            option  : e.target.value
                        })
                    }}>
                    <option value='false'>Disable</option>
                    <option value='true'>Enable</option>
                </select>
            </div>

        </div>
    )
};

export default Option;
