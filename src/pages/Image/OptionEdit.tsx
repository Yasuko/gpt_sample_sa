import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import reducer
import {
    ImageEditOptionPropsInterface,
    ImageEditOptionInterface,
    initialState
} from '../../_domain/image/reducers/ImageEditOption'

// import Component
import Screen from './Screen'

export const Option = (): JSX.Element => {
    const dispatch = useDispatch();    
    // コンテンツ表示Reducer呼び出し
    const io = useSelector((state: ImageEditOptionPropsInterface): ImageEditOptionInterface => {
        return state.ImageEditOption === undefined ? initialState : state.ImageEditOption
    })

    return (
        <div className='whisper-option'>
            <h3>Edit Option</h3>
            <div className="container-fluid">
                <div className="row">
                    <div className="col my-box">
                        <div
                            id="File1b"
                            className="drag-area-sm center"
                            onDragOver={(e) => onDragStart(e)}
                            onDrop={(e) => onDragEnd(e, dispatch, 'base')}
                        >
                            BaseImage
                        </div>
                    </div>
                    <div className="col my-box">
                        {(io.image_base64 === '')
                            ? ''
                            : showImage(io.image_base64, dispatch)
                        }

                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col my-box">
                        <div
                            id="File1b"
                            className="drag-area-sm center"
                            onDragOver={(e) => onDragStart(e)}
                            onDrop={(e) => onDragEnd(e, dispatch, 'mask')}
                        >
                            MaskImage
                        </div>
                    </div>
                    <div className="col my-box">
                        {(io.mask_base64 === '')
                            ? ''
                            : <img
                                src={io.mask_base64}
                                alt='MaskImage'
                                className='img-fluid'/>
                        }
                        
                    </div>
                </div>
            </div>
            <label className="sr-only" htmlFor="text1">Prompt:</label>
            <textarea
                className="form-control mb-2"
                id="text1"
                placeholder="Input Sample"
                defaultValue={io.prompt}
                onChange={(e) => {
                    dispatch({
                        type     : 'ImageEditOption/setPrompt',
                        prompt   : e.target.value
                    })
                }} />
            <div
                className='btn btn-info'
                onClick={() => {
                    dispatch({
                        type: 'ImageEditAction/sendPrompt',
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
                            type    : 'ImageEditOption/setModel',
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
                            type    : 'ImageEditOption/setSize',
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
                    response_format :
                </div>
                <div className='whisper-option-content'>
                    <select
                    value={io.response_format}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ImageEditOption/setResponseFormat',
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
                                type    : 'ImageEditOption/setN',
                                n       : e.target.value
                            })
                        }} />
                </div>
            </div>
            <Screen />
        </div>
    )
}

const onDragStart = (e: any): void => {
    const _e = e as Event
    _e.preventDefault()
}

const onDragEnd = (e: any, dispatch: any, target: 'base' | 'mask'): void => {
    const _e = e as Event
    _e.preventDefault()
    
    dispatch({
        type    : 'ImageEditAction/DragEnd',
        event   : _e,
        job     : 'edit',
        target  : target
    })
    _e.stopPropagation()
}

const showImage = (
    image: string,
    dispatch: any
): JSX.Element[] => {
    return [
        (<img
            key={0}
            src={image}
            alt='MaskImage'
            className='img-fluid'/>) ,
        (<button
            key={1}
            className='btn btn-secondary btn-sm'
            onClick={() => {
                dispatch({
                    type: 'ImageScreen/setSubScreen',
                    subscreen : 'mask'
                })
            }}>
            make mask
        </button>)
    ]
}

export default Option;
