import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import reducer
import {
    ImageOptionPropsInterface,
    ImageOptionInterface,
    initialState
} from '../../_domain/image/reducers/ImageOption';

export const Option = (): JSX.Element => {
    const dispatch = useDispatch();    
    // コンテンツ表示Reducer呼び出し
    const io = useSelector((state: ImageOptionPropsInterface): ImageOptionInterface => {
        return state.ImageOption === undefined ? initialState : state.ImageOption
    })

    return (
        <div className='whisper-option margin'>
            <h3>Image Option</h3>
            <label className="sr-only" htmlFor="text1">Prompt:</label>
            <textarea
                className="form-control mb-2"
                id="text1"
                placeholder="Input Sample"
                defaultValue={io.prompt}
                onChange={(e) => {
                    dispatch({
                        type     : 'ImageOption/setPrompt',
                        prompt   : e.target.value
                    })
                }} />
            <div
                className='btn btn-info'
                onClick={() => {
                    dispatch({
                        type: 'ImageAction/sendPrompt',
                    })
                }}>
                Send
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    model :
                </div>
                <div className='whisper-option-content'>
                    <select
                    value={io.model}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ImageOption/setModel',
                            model   : e.target.value
                        })
                    }}>
                        <option value='dall-e-3'>dall-e-3</option>
                        <option value='dall-e-2'>dall-e-2</option>
                    </select>
                </div>
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    size :
                </div>
                <div className='whisper-option-content'>
                    <select
                    value={io.size}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ImageOption/setSize',
                            size    : e.target.value
                        })
                    }}>
                        <option value='256x256'>256x256</option>
                        <option value='512x512'>512x512</option>
                        <option value='1024x1024'>1024x1024</option>
                        <option value='1024x1792'>1024x1792</option>
                        <option value='1792x1024'>1792x1024</option>
                    </select>
                </div>
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    style :
                </div>
                <div className='whisper-option-content'>
                    <select
                        value={io.style}
                        onChange={(e) => {
                            dispatch({
                                type    : 'ImageOption/setStyle',
                                style    : e.target.value
                            })
                        }}>
                        <option value='vivid'>vivid</option>
                        <option value='natural'>natural</option>
                    </select>
                </div>
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    response_format :
                </div>
                <div className='whisper-option-content'>
                    <select
                    value={io.response_format}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ImageOption/setResponseFormat',
                            responseFormat    : e.target.value
                        })
                    }}>
                        <option value='b64_json'>b64_json</option>
                        <option value='url'>url</option>
                    </select>
                </div>
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    quality :
                </div>
                <div className='whisper-option-content'>
                    <select
                    value={io.model}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ImageOption/setQuality',
                            quality : e.target.value
                        })
                    }}>
                        <option value='standard'>standard</option>
                        <option value='hq'>hq</option>
                    </select>
                </div>
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    n :
                </div>
                <div className='whisper-option-content'>
                    <input
                        type='number'
                        min={1}
                        max={4}
                        value={io.n}
                        onChange={(e) => {
                            dispatch({
                                type    : 'ImageOption/setN',
                                n       : e.target.value
                            })
                        }} />
                </div>
            </div>
        </div>
    )
};

export default Option;
