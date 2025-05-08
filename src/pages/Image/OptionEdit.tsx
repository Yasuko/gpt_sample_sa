import React, { JSX } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import reducer
import {
    ImageEditOptionPropsInterface,
    ImageEditOptionInterface,
    initialState
} from '../../_domain/image/reducers/ImageEditOption'

// import Component
import Screen from './Screen'
import { Dispatch } from '@reduxjs/toolkit'

export const Option = (): JSX.Element => {
    const dispatch = useDispatch();    
    // コンテンツ表示Reducer呼び出し
    const io = useSelector((state: ImageEditOptionPropsInterface): ImageEditOptionInterface => {
        return state.ImageEditOption === undefined ? initialState : state.ImageEditOption
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
                        onDrop={(e: React.DragEvent) => onDragEnd(e, dispatch, 'base')}
                    >
                        <p className='mt-4'>BaseImage</p>
                    </div>
                </div>
                <div className="col-span-3 flex justify-center items-center -mt-8">
                    <div className="mr-4">
                        {(io.image_base64 === '')
                            ? ''
                            : showImage(io.image_base64, dispatch)
                        }

                    </div>

                    {/*
                    <div className="">
                        <div
                            id="File1b"
                            className=""
                            onDragOver={(e) => onDragStart(e)}
                            onDrop={(e) => onDragEnd(e, dispatch, 'mask')}
                        >
                            MaskImage
                        </div>
                    </div>
                    */}
                    <div className="
                    w-36 ml-8 p-0 border-2
                    rounded-lg text-center hover:border-blue-500
                    ">
                        {(io.mask_base64 === '')
                            ? ''
                            : <img
                                src={io.mask_base64}
                                alt='MaskImage'
                                className='w-36'/>
                        }
                        
                    </div>
                </div>
                <div className='col-span-3'>
                    <textarea
                        cols={70}
                        rows={4}
                        className="
                            w-full rounded m-2 mb-1 p-4
                            text-gray-500
                        "
                        id="text1"
                        placeholder="Input Prompt"
                        defaultValue={io.prompt}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            dispatch({
                                type     : 'ImageEditOption/setPrompt',
                                prompt   : e.target.value
                            })
                        }} />
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
                                type: 'ImageEditAction/sendPrompt',
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
                                type    : 'ImageEditOption/setModel',
                                model   : e.target.value
                            })
                    }}>
                        <option value='gpt-image-1'>gpt-image-1</option>
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
                            dark:focus:ring-neutral-600'
                        value={io.size}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            dispatch({
                                type    : 'ImageEditOption/setSize',
                                size    : e.target.value
                            })
                        }}>
                        <option value='256x256'>256x256</option>
                        <option value='512x512'>512x512</option>
                        <option value='1024x1024'>1024x1024</option>
                        <option value='1024x1536'>1024x1536</option>
                        <option value='1536x1024'>1536x1024</option>
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
                                type    : 'ImageEditOption/setN',
                                n       : e.target.value
                            })
                        }} />
                </div>
            <Screen />
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
    dispatch: Dispatch,
    target: 'base' | 'mask'
): void => {
    e.preventDefault()
    
    dispatch({
        type    : 'ImageEditAction/DragEnd',
        event   : e,
        job     : 'edit',
        target  : target
    })
    e.stopPropagation()
}

const showImage = (
    image: string,
    dispatch: Dispatch
): JSX.Element[] => {
    return [
        (<img
            key={0}
            src={image}
            alt='MaskImage'
            className='h-36 m-4 mb-2 rounded-lg'/>) ,
        (<button
            key={1}
            className='
                ml-6 py-2 px-4 inline-flex items-center gap-x-2
                text-sm font-medium text-white
                rounded-lg border border-transparent
                bg-gray-600 
                hover:bg-gray-700 focus:outline-none focus:bg-gray-700
                disabled:opacity-50 disabled:pointer-events-none
            '
            onClick={() => {
                dispatch({
                    type: 'ImageScreen/setSubScreen',
                    subscreen : 'mask'
                })
                dispatch({
                    type: 'ImageEditAction/setupMaskPaint',
                })
            }}>
            Mask Builder
        </button>)
    ]
}

export default Option
