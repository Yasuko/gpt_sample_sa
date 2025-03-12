import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import reducer
import {
    ImageChangeOptionPropsInterface,
    ImageChangeOptionInterface,
    initialState
} from '../../_domain/image/reducers/ImageChangeOption'
import { Dispatch } from '@reduxjs/toolkit';

export const OptionChange = (): JSX.Element => {
    const dispatch = useDispatch();    
    // コンテンツ表示Reducer呼び出し
    const io = useSelector((state: ImageChangeOptionPropsInterface): ImageChangeOptionInterface => {
        return state.ImageChangeOption === undefined ? initialState : state.ImageChangeOption
    })

    return (
        <div className='grid grid-cols-3 gap-4'>
            <div className="col-span-3 flex justify-center items-center">
                <div
                    id="File1b"
                    className="
                        w-full h-36 mt-4 p-4
                        border-2 border-gray-300
                        rounded-lg
                        text-center
                        hover:border-blue-500
                    "
                    onDragOver={(e: React.DragEvent) => onDragStart(e)}
                    onDrop={(e: React.DragEvent) => onDragEnd(e, dispatch)}
                >
                    ChangeImage
                </div>
            </div>
            <div className='col-span-3 flex justify-center items-center'>
                <div className="mr-4">
                    {(io.image_base64 === '')
                        ? ''
                        : showImage(io.image_base64, dispatch)
                    }

                </div>
                <button
                    className='
                        ml-2 mr-4 py-2 px-4 inline-flex items-center gap-x-2
                        text-sm font-medium text-white
                        rounded-lg border border-transparent
                        bg-blue-600 
                        hover:bg-blue-700 focus:outline-none focus:bg-blue-700
                        disabled:opacity-50 disabled:pointer-events-none
                    '
                    onClick={() => {
                        dispatch({
                            type: 'ImageChangeAction/sendPrompt',
                        })
                    }}>
                    Send
                </button>
            </div>
            <div className='leading-10 mt-1'>
                model :
            </div>
            <div className='col-span-2'>
                <select
                    className='
                        py-3 px-4 pe-9 block w-full
                        border-gray-200 rounded-lg
                        text-sm
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    value={io.model}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    dispatch({
                        type    : 'ImageChangeOption/setModel',
                        model   : e.target.value
                    })
                }}>
                    <option value='dall-e-2'>dall-e-2</option>
                </select>
            </div>

            <div className='leading-10 mt-1'>
                size :
            </div>
            <div className='col-span-2'>
                <select
                    className='
                        py-3 px-4 pe-9 block w-full
                        border-gray-200 rounded-lg
                        text-sm
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    value={io.size}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    dispatch({
                        type    : 'ImageChangeOption/setSize',
                        size    : e.target.value
                    })
                }}>
                    <option value='256x256'>256x256</option>
                    <option value='512x512'>512x512</option>
                    <option value='1024x1024'>1024x1024</option>
                </select>
            </div>
            <div className='leading-10 mt-1'>
                response_format :
            </div>
            <div className='col-span-2'>
                <select
                    className='
                        py-3 px-4 pe-9 block w-full
                        border-gray-200 rounded-lg
                        text-sm
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    value={io.response_format}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    dispatch({
                        type    : 'ImageChangeOption/setResponseFormat',
                        responseFormat    : e.target.value
                    })
                }}>
                    <option value='b64_json'>b64_json</option>
                    <option value='url'>url</option>
                </select>
            </div>
            <div className='leading-10 mt-1'>
                n :
            </div>
            <div className='col-span-2'>
                <input
                    className='
                        py-3 px-4 pe-9 block w-full
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    type='number'
                    min={1}
                    max={4}
                    value={io.n}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        dispatch({
                            type    : 'ImageChangeOption/setN',
                            n       : e.target.value
                        })
                    }} />
            </div>

        </div>
    )
}

const onDragStart = (
    e: React.DragEvent
): void => {
    e.preventDefault()
}

const onDragEnd = (
    e: React.DragEvent,
    dispatch: Dispatch
): void => {
    e.preventDefault()
    
    dispatch({
        type    : 'ImageChangeAction/DragEnd',
        event   : e,
        job     : 'change'
    })
    e.stopPropagation()
}

const showImage = (
    image: string,
    dispatch: Dispatch
): JSX.Element => {
    return (<img
            key={0}
            src={image}
            alt='MaskImage'
            className='h-36 m-4 mb-2 rounded-lg'/>)
}

export default OptionChange
