import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { ToolType } from '../../_lib/gpt/_helper/chat.helper'

import {
    EditToolType,
    ToolsInterface,
    ToolsPropsInterface,
    initialState
} from '../../_domain/_all/reducers/Tools'


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
        <div className='absolute top-0 left-0 w-svw h-svh bg-gray-800 bg-opacity-90'>
            <h1 className="
                m-8
                text-4xl text-left
                text-gray-600
                ">Tool Editor</h1>
            <div className=' grid grid-cols-2 gap-4 m-8'>
                { ToolList(t.tools) }
                { ToolDetail(t.editor, dispatch) }
            </div>
        </div>
    )
}

const ToolList = (tools: ToolType[]): JSX.Element => {
    let list = [<div className='h-4 text-center col-span-8 gap-4'>none</div>]
    if (tools.length > 0) {
        list = tools.map((val, key) => {
            return (
                <div key={key} className=''>
                    {val.function.name}
                    {val.function.description}
                    {val.function.strict}
                    { ParametersList(val.function.parameters) }
                </div>
            )
        })
    }
    return (
        <div
            className='
                w-full h-[85vh] p-4
                grid grid-cols-8 gap-2
                bg-gray-700 bg-opacity-80
                rounded-lg
                overflow-y-auto overflow-x-hidden
            '>
            <div
                className="
                    col-span-2
                    block h-4 -mt-4 mb-2
                    text-lg text-gray-700 font-medium text-center
                    dark:text-white
                ">name</div>
            <div
                className="
                    col-span-4
                    block h-4 -mt-4 mb-2
                    text-lg text-gray-700 font-medium text-center
                    dark:text-white
                ">description</div>
            <div
                className="
                    col-span-1
                    block h-4 -mt-4 mb-2
                    text-lg text-gray-700 font-medium text-center
                    dark:text-white
                ">required</div>
            <div
                className="
                    col-span-1
                    block h-4 -mt-4 mb-2
                    text-lg text-gray-700 font-medium text-center
                    dark:text-white
                ">additional</div>
            {list}        
        </div>
    )
}


const ToolDetail = (
    tool: EditToolType,
    dispatch: Dispatch
): JSX.Element => {
    console.log(tool)
    return (
        <div className=''>
            <div className='grid grid-cols-4 gap-4'>
                <label
                    htmlFor="hs-firstname-hire-us-2"
                    className="
                        leading-10 mt-1
                        block mb-2 text-sm text-gray-700 font-medium dark:text-white
                        ">name</label>
                <input
                    type="text"
                    name="hs-firstname-hire-us-2"
                    id="hs-firstname-hire-us-2"
                    className="
                        col-span-3
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
                                id: 0,
                                name: e.target.value
                            }
                        })
                    }} />

                <label
                    htmlFor="hs-lastname-hire-us-2"
                    className="
                        leading-10 mt-1
                        block mb-2 text-sm text-gray-700 font-medium dark:text-white
                    ">description</label>
                <input
                    type="text"
                    name="hs-lastname-hire-us-2"
                    id="hs-lastname-hire-us-2"
                    className="
                        col-span-3
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
                                id: 0,
                                description: e.target.value
                            }
                        })
                    }} />

                { ParametersList(tool?.parameters, dispatch) }

                <label
                    htmlFor="hs-lastname-hire-us-2"
                    className="
                        leading-10 mt-1
                        block mb-2
                        text-sm text-gray-700 font-medium
                        dark:text-white
                    ">strict</label>
                <input
                    name="hs-lastname-hire-us-2"
                    id="hs-lastname-hire-us-2"
                    className='
                        col-span-3
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
                                id: 0,
                                strict: e.target.checked
                            }
                        })
                    }}
                />
            </div>
        </div>
    )
}

const ParametersList = (
    parameters?: ToolType['function']['parameters'] | undefined,
    dispatch: Dispatch
): JSX.Element => {

    let params = <div>none....</div>
    if (parameters !== undefined && Object.keys(parameters).length > 0) {

        let index = 0
        const list = Object.keys(parameters?.properties).map((val, key) => {
            index++
            return (
                <div key={index} className=''>
                    <input
                        type='text'
                        value={parameters?.properties[val].type}
                        />
                    <input
                        type='text'
                        value={parameters?.properties[val].description}
                        />
                </div>
            )
        })
        params = (
            <div className=''>
                { (parameters?.type) ? <div>{parameters.type}</div> : '' }
                { (parameters?.required) ? <div>{parameters.required}</div> : '' }
                {list}
                { (parameters?.additionalProperties) ? <div>{parameters.additionalProperties}</div> : '' }
            </div>
        )
    }
    
    return (
        <>
            <div className='leading-10 mt-1'>
                <h2>Parameters</h2>
                <button
                    className='
                    py-1 px-4 inline-flex items-center gap-x-2
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
                                    key: 'object',
                                    type: 'object',
                                    description: 'object',
                                }
                            }
                        })
                    }}
                    >
                    Add
                </button>
            </div>
            <div
                className='
                    w-full h-full p-4
                    col-span-3 border border-gray-600 rounded-lg
                '>
                <div className='grid grid-cols-8 gap-2'>
                    <div
                        className="
                            col-span-2
                            block h-4 -mt-4 mb-2
                            text-lg text-gray-700 font-medium text-center
                            dark:text-white
                        ">key</div>
                    <div
                        className="
                            col-span-2
                            block h-4 -mt-4 mb-2
                            text-lg text-gray-700 font-medium text-center
                            dark:text-white
                        ">name</div>
                    <div
                        className="
                            col-span-4
                            block h-4 -mt-4 mb-2
                            text-lg text-gray-700 font-medium text-center
                            dark:text-white
                        ">description</div>
                    <input
                        type="text"
                        id="hs-lastname-hire-us-2"
                        className="
                            col-span-2
                            py-2 px-4 block w-full
                            border-gray-200 rounded-lg
                            text-sm focus:border-blue-500 focus:ring-blue-500
                            disabled:opacity-50 disabled:pointer-events-none
                            dark:bg-gray-600 dark:border-neutral-700
                            dark:text-neutral-400 dark:placeholder-neutral-500
                            dark:focus:ring-neutral-600
                        "
                    />
                    <input
                        type="text"
                        id="hs-lastname-hire-us-2"
                        className="
                            col-span-2
                            py-2 px-4 block w-full
                            border-gray-200 rounded-lg
                            text-sm focus:border-blue-500 focus:ring-blue-500
                            disabled:opacity-50 disabled:pointer-events-none
                            dark:bg-gray-600 dark:border-neutral-700
                            dark:text-neutral-400 dark:placeholder-neutral-500
                            dark:focus:ring-neutral-600
                        "
                    />
                    <input
                        type="text"
                        id="hs-lastname-hire-us-2"
                        className="
                            col-span-4
                            py-2 px-4 block w-full
                            border-gray-200 rounded-lg
                            text-sm focus:border-blue-500 focus:ring-blue-500
                            disabled:opacity-50 disabled:pointer-events-none
                            dark:bg-gray-600 dark:border-neutral-700
                            dark:text-neutral-400 dark:placeholder-neutral-500
                            dark:focus:ring-neutral-600
                        "
                    />
                </div>
                {params}
            </div>
        </>
    )
}

export default Tool_Editor
