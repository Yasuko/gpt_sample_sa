import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'

import { ToolType } from '../../_lib/gpt/_helper/chat.helper'

// import reducer
import {
    EditToolType,
    ToolsInterface,
    ToolsPropsInterface,
    initialState
} from '../../_domain/_all/reducers/Tools'

// import component
import ToolEditorProperties from './tool_editor_properties'
import ToolEditorToolList from './tool_editor_tool_list'


type ToolEditorState = {
    tools?: ToolType[]
    next?: string
}

export const Tool_Editor = (state: ToolEditorState): JSX.Element => {
    const dispatch = useDispatch()

    // コンテンツ表示Reducer呼び出し
    const t = useSelector((state: ToolsPropsInterface): ToolsInterface => {
        return state.Tools === undefined ? initialState : state.Tools
    })

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
                            dispatch({
                                type: 'Tools/add',
                                payload: {}
                            })
                        }}
                        >
                        { (t.editor.id > 0) ? 'UpdateTool' : 'AddTool' }
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
                { ToolDetail(t.editor, t.edit_properties, dispatch) }
            </div>
        </div>
    )
}

const ToolDetail = (
    tool: EditToolType,
    properties: EditToolType['parameters']['properties'],
    dispatch: Dispatch
): JSX.Element => {
    return (
        <div className='col-span-2'>
            <div className='grid grid-cols-5 gap-4'>
                <label
                    htmlFor="hs-firstname-hire-us-2"
                    className="
                        leading-10 mt-1
                        block mb-2
                        text-center text-sm text-gray-700 font-medium dark:text-white
                        ">name</label>
                <input
                    type="text"
                    name="hs-firstname-hire-us-2"
                    id="hs-firstname-hire-us-2"
                    className="
                        col-span-4
                        py-3 px-4 block w-full
                        border-gray-200 rounded-lg
                        text-sm focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-gray-600 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    "
                    value={tool?.name}
                    onChange={ (e) => {
                        dispatch({
                            type: 'Tools/updateEditor',
                            payload: {
                                id: tool.id,
                                name: e.target.value
                            }
                        })
                    }} />

                <label
                    htmlFor="hs-lastname-hire-us-2"
                    className="
                        leading-10 mt-1
                        block mb-2
                        text-center text-sm text-gray-700 font-medium
                        dark:text-white
                    ">description</label>
                <input
                    type="text"
                    name="hs-lastname-hire-us-2"
                    id="hs-lastname-hire-us-2"
                    className="
                        col-span-4
                        py-3 px-4 block w-full
                        border-gray-200 rounded-lg
                        text-sm focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-gray-600 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    "
                    value={tool?.description}
                    onChange={(e) => {
                        dispatch({
                            type: 'Tools/updateEditor',
                            payload: {
                                id: tool.id,
                                description: e.target.value
                            }
                        })
                    }} />

                <ToolEditorProperties properties={properties} parameters={tool.parameters} />

                <label
                    htmlFor="hs-lastname-hire-us-2"
                    className="
                        leading-10 mt-1
                        block mb-2
                        text-center text-sm text-gray-700 font-medium
                        dark:text-white
                    ">strict</label>
                <input
                    name="hs-lastname-hire-us-2"
                    id="hs-lastname-hire-us-2"
                    className='
                        col-span-4
                        w-full mt-4 py-3 px-4 pe-9 block
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                        '
                    type='checkbox'
                    checked={(!tool?.strict) ? false : tool?.strict}
                    onChange={(e) => {
                        dispatch({
                            type: 'Tools/updateEditor',
                            payload: {
                                id: tool.id,
                                strict: e.target.checked
                            }
                        })
                    }}
                />
            </div>
        </div>
    )
}

export default Tool_Editor
