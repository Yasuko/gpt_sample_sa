import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ToolType } from '../../../_lib/gpt/_helper/chat.helper'

// import reducer
import {
    ToolsInterface,
    ToolsPropsInterface,
    initialState
} from '../../../_domain/_all/reducers/Tools'

// import component
import ToolEditorForm from './tool_editor_form'
import ToolEditorToolList from './tool_editor_tool_list'


type ToolEditorState = {
    tools?: ToolType[]
    next?: string
}

export const ToolEditor = (state: ToolEditorState): JSX.Element => {
    const dispatch = useDispatch()

    // コンテンツ表示Reducer呼び出し
    const t = useSelector((state: ToolsPropsInterface): ToolsInterface => {
        return state.Tools === undefined ? initialState : state.Tools
    })

    if (!t.screen) return <></>

    return (
        <div className='absolute top-0 left-0 w-svw h-svh bg-gray-800 bg-opacity-95'>
            <h1 className="
                m-8
                text-4xl text-left
                text-gray-600
                ">Tool Editor</h1>
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
                        onClick={() => {
                            const patch = t.editor.id < 999
                            ? {
                                type: 'Tools/update',
                                payload: t.editor.id
                            }:
                            {
                                type: 'Tools/add',
                                payload: {}
                            }
                            
                            dispatch(patch)
                        }}
                        >
                        { (t.editor.id < 999) ? 'UpdateTool' : 'AddTool' }
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
                <ToolEditorToolList tools={t.tools} />
                <ToolEditorForm tool={t.editor}  parameters={t.edit_parameters} properties={t.edit_properties} />
            </div>
        </div>
    )
}

export default ToolEditor
