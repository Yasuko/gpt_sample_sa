import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import reducer
import {
    VisionFormPropsInterface,
    VisionFormInterface,
    initialState
} from '../../_domain/vision/reducers/VisionForm'

// import component


export const Option = (): JSX.Element => {
    const dispatch = useDispatch()
    // コンテンツ表示Reducer呼び出し
    const cf = useSelector((state: VisionFormPropsInterface): VisionFormInterface => {
        return state.VisionForm === undefined ? initialState : state.VisionForm
    })

    return (
        <div className='
            grid  grid-cols-2 gap4
            w-full
        '>
            <div className='leading-10 mt-1 ml-6'>
                temperature [{cf.temperature}]:
            </div>
            <div className=''>
                <input
                    className='
                        py-3 px-4 pe-9 block w-2/3
                        border-gray-200 rounded-lg
                        text-sm
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
                    type='range'
                    defaultValue={cf.temperature}
                    min={0.0}
                    max={2.0}
                    step={0.1}
                    onChange={(e) => {
                        dispatch({
                            type        : 'VisionForm/setTemperature',
                            temperature : Number(e.target.value)
                        })
                }} />
            </div>
            <div className='leading-10 mt-1 ml-6'>
                max_tokens [{cf.max_tokens}]: 
            </div>
            <div className=''>
                <input
                    className='
                        py-3 px-4 pe-9 block w-2/3
                        border-gray-200 rounded-lg
                        text-sm
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600'
                    type='range'
                    min={1}
                    max={3000}
                    step={1}
                    defaultValue={cf.max_tokens}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        dispatch({
                            type        : 'VisionForm/setMaxTokens',
                            max_tokens  : Number(e.target.value)
                        })
                    }}
                />
            </div>
        </div>
    )
}

export default Option
