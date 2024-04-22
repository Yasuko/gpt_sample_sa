import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import reducer
import {
    ImageChangeOptionPropsInterface,
    ImageChangeOptionInterface,
    initialState
} from '../../_domain/image/reducers/ImageChangeOption'

export const OptionChange = (): JSX.Element => {
    const dispatch = useDispatch();    
    // コンテンツ表示Reducer呼び出し
    const io = useSelector((state: ImageChangeOptionPropsInterface): ImageChangeOptionInterface => {
        return state.ImageChangeOption === undefined ? initialState : state.ImageChangeOption
    })

    return (
        <div className='whisper-option'>
            <h3>Change Option</h3>
            <div className="container-fluid">
                <div className="row">
                    <div className="col my-box">
                        <div
                            id="File1b"
                            className="drag-area-sm center"
                            onDragOver={(e) => onDragStart(e)}
                            onDrop={(e) => onDragEnd(e, dispatch)}
                        >
                            ChangeImage
                        </div>
                    </div>
                    <div className="col my-box">
                        {(io.image_base64 === '')
                            ? ''
                            : <img
                                src={io.image_base64}
                                alt='MaskImage'
                                className='img-fluid'/>
                        }
                    </div>
                </div>
            </div>
            <div
                className='btn btn-info'
                onClick={() => {
                    dispatch({
                        type: 'ImageChangeAction/sendPrompt',
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
}

const onDragStart = (e: any): void => {
    const _e = e as Event
    _e.preventDefault()
}

const onDragEnd = (e: any, dispatch: any): void => {
    const _e = e as Event
    _e.preventDefault()
    
    dispatch({
        type    : 'ImageChangeAction/DragEnd',
        event   : _e,
        job     : 'change'
    })
    _e.stopPropagation()
}


export default OptionChange
