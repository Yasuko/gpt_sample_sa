import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ToolType } from '../../../_lib/gpt/_helper/chat.helper'

// import reducer
import {
    ResponseFormatInterface,
    ResponseFormatPropsInterface,
    initialState
} from '../../../_domain/_all/reducers/ResponseFormat'

// import component
import ResponseFormarForm from './response_format_form'
import ResponseFormList from './response_format_list'

export const ResponseFormat = (): JSX.Element => {
    const dispatch = useDispatch()

    // コンテンツ表示Reducer呼び出し
    const r = useSelector((state: ResponseFormatPropsInterface): ResponseFormatInterface => {
        return state.ResponseFormat === undefined ? initialState : state.ResponseFormat
    })

    // if (!t.screen) return <></>

    return (
        <div className='absolute top-0 left-0 w-svw h-svh bg-gray-800 bg-opacity-95'>
            <h1 className="
                m-8
                text-4xl text-left
                text-gray-600
                ">Response Format</h1>
            <div className=' grid grid-cols-3 gap-4 m-8'>
                <div className="
                        absolute right-[3%] top-[3%]
                        flex inline-flex items-center gap-x-2
                    ">
                    <button
                        className='
                        py-3 px-4 ml-4 inline-flex items-center gap-x-2
                        text-sm font-medium text-gray-500
                        rounded-lg border border-gray-200
                        hover:border-blue-600 hover:text-blue-600
                        hover:bg-gray-600
                        focus:outline-none focus:border-blue-600 focus:text-blue-600
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:border-neutral-700 dark:text-neutral-400
                        dark:hover:text-blue-500 dark:hover:border-blue-600
                        dark:focus:text-blue-500 dark:focus:border-blue-600
                        '
                        onClick={() => {}}
                        >
                        AddTool
                    </button>
                    <button
                        className='
                        py-3 px-4 ml-4 inline-flex items-center gap-x-2
                        text-sm font-medium text-gray-500
                        rounded-lg border border-gray-200
                        hover:border-blue-600 hover:text-blue-600
                        hover:bg-gray-600
                        focus:outline-none focus:border-blue-600 focus:text-blue-600
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:border-neutral-700 dark:text-neutral-400
                        dark:hover:text-blue-500 dark:hover:border-blue-600
                        dark:focus:text-blue-500 dark:focus:border-blue-600
                        '
                        onClick={() => {
                            dispatch({
                                type: 'ChatAction/addTools',
                                payload: {}
                            })
                        }}
                        >
                        Save
                    </button>
                    <button
                        className='
                        py-3 px-4 ml-4 inline-flex items-center gap-x-2
                        text-sm font-medium text-gray-500
                        rounded-lg border border-gray-200
                        hover:border-blue-600 hover:text-blue-600
                        hover:bg-gray-600
                        focus:outline-none focus:border-blue-600 focus:text-blue-600
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:border-neutral-700 dark:text-neutral-400
                        dark:hover:text-blue-500 dark:hover:border-blue-600
                        dark:focus:text-blue-500 dark:focus:border-blue-600
                        '
                        onClick={() => {
                            dispatch({
                                type: 'Tools/addProperties',
                                payload: {
                                    id: 0,
                                    properties: {
                                        key: 'test001',
                                        type: 'object',
                                        description: 'unkoyan',
                                    }
                                }
                            })
                        }}
                        >
                        Close
                    </button>
                </div>
                <ResponseFormList schemas={r.schemas} />
                <ResponseFormarForm schemas={r}  />
            </div>
        </div>
    )
}

export default ResponseFormat
