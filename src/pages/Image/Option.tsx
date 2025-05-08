import React, { JSX } from 'react';
import { useDispatch, useSelector } from 'react-redux'

// import reducer
import {
    ImageOptionPropsInterface,
    ImageOptionInterface,
    initialState
} from '../../_domain/image/reducers/ImageOption'

export const Option = (): JSX.Element => {
    const dispatch = useDispatch();    
    // コンテンツ表示Reducer呼び出し
    const io = useSelector((state: ImageOptionPropsInterface): ImageOptionInterface => {
        return state.ImageOption === undefined ? initialState : state.ImageOption
    })

    return (
        <div className='
            w-full mt-4
            grid  grid-cols-2 gap4
        '>
            <div className='col-span-2'>
                <textarea
                    cols={70}
                    rows={4}
                    className="
                        w-full rounded m-2 mb-1 p-4
                        text-gray-500
                    "
                    id="text1"
                    placeholder="Input Generate Prompt"
                    defaultValue={io.prompt}
                    onChange={(e) => {
                        dispatch({
                            type     : 'ImageOption/setPrompt',
                            prompt   : e.target.value
                        })
                    }} />
                <div
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
                            type: 'ImageAction/sendPrompt',
                        })
                    }}>
                    Send
                </div>
            </div>
            <div className='ml-2 mt-1 leading-10'>
                model :
            </div>
            <div className=''>
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
                    onChange={(e) => {
                        dispatch({
                            type    : 'ImageOption/setModel',
                            model   : e.target.value
                        })
                    }}
                >
                    <option value='gpt-image-1'>gpt-image-1</option>
                    <option value='dall-e-3'>dall-e-3</option>
                    <option value='dall-e-2'>dall-e-2</option>
                </select>
            </div>
            <div className='ml-2 mt-1 leading-10'>
                size :
            </div>
            <div className=''>
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
                    onChange={(e) => {
                        dispatch({
                            type    : 'ImageOption/setSize',
                            size    : e.target.value
                        })
                    }}
                >
                    <option value='256x256'>256x256</option>
                    <option value='512x512'>512x512</option>
                    <option value='1024x1024'>1024x1024</option>
                    <option value='1024x1792'>1024x1792</option>
                    <option value='1792x1024'>1792x1024</option>
                </select>
            </div>

            <div className='ml-2 mt-1 leading-10'>
                quality :
            </div>
            <div className=''>
                <select
                    className='
                        py-3 px-4 pe-9 block w-full
                        text-sm
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    value={io.model}
                    onChange={(e :React.ChangeEvent<HTMLSelectElement>) => {
                        dispatch({
                            type    : 'ImageOption/setQuality',
                            quality : e.target.value
                        })
                    }}
                >
                    <option value='medium'>medium</option>
                    <option value='low'>low</option>
                    <option value='high'>high</option>
                    <option value='auto'>auto</option>
                </select>
            </div>
            <div className='ml-2 mt-1 leading-10'>
                n :
            </div>
            <div className=''>
                <input
                    className='
                        py-3 px-4 pe-9 block w-full
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    type='range'
                    min={1}
                    max={4}
                    step={1}
                    value={io.n}
                    onChange={(e :React.ChangeEvent<HTMLInputElement>) => {
                        dispatch({
                            type    : 'ImageOption/setN',
                            n       : e.target.value
                        })
                    }} />
            </div>
        </div>
    )
};

export default Option;
