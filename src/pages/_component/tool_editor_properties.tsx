import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'

import { ToolType } from '../../_lib/gpt/_helper/chat.helper'

import {
    EditToolType,
} from '../../_domain/_all/reducers/Tools'


type ToolEditorPropertiesState = {
    parameters: ToolType['function']['parameters'],
    properties: EditToolType['parameters']['properties'],
    next?: string
}

const ToolEditorProperties = ({
    parameters,
    properties,
}: {
    parameters: ToolType['function']['parameters'],
    properties: EditToolType['parameters']['properties'],
}): JSX.Element => {
    const dispatch = useDispatch()

    let params = <div>none....</div>
    if (Object.keys(properties).length > 0) {

        let index = 0
        const list = Object.keys(properties).map((val, key) => {
            index++
            return (
                <div key={index} className='grid grid-cols-7 gap-2 mt-1'>
                    <input
                        type='text'
                        value={val}
                        className='
                            col-span-2
                            py-1 px-4 block w-full
                            border-gray-200 rounded-lg
                            text-sm focus:border-blue-500 focus:ring-blue-500
                            disabled:opacity-50 disabled:pointer-events-none
                            dark:bg-gray-600 dark:border-neutral-700
                            dark:text-neutral-400 dark:placeholder-neutral-500
                            dark:focus:ring-neutral-600
                        '
                        />
                    <input
                        type='text'
                        value={properties[val].type}
                        className='
                            col-span-2
                            py-1 px-4 block w-full
                            border-gray-200 rounded-lg
                            text-sm focus:border-blue-500 focus:ring-blue-500
                            disabled:opacity-50 disabled:pointer-events-none
                            dark:bg-gray-600 dark:border-neutral-700
                            dark:text-neutral-400 dark:placeholder-neutral-500
                            dark:focus:ring-neutral-600'
                        />
                    <input
                        type='text'
                        value={properties[val].description}
                        className='
                            col-span-2
                            py-1 px-4 block w-full
                            border-gray-200 rounded-lg
                            text-sm focus:border-blue-500 focus:ring-blue-500
                            disabled:opacity-50 disabled:pointer-events-none
                            dark:bg-gray-600 dark:border-neutral-700
                            dark:text-neutral-400 dark:placeholder-neutral-500
                            dark:focus:ring-neutral-600'
                        />
                    <button
                        className='
                            col-span-1
                            w-10
                            py-1 px-2 inline-flex items-center
                            text-sm font-medium text-gray-500 text-center
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
                                type: 'Tools/removeProperties',
                                payload: {
                                    id: 0,
                                    key: val
                                }
                            })
                        }}
                        >
                        Del
                    </button>
                </div>
            )
        })
        params = (
            <div>
                
                { list }
            </div>
        )
    }
    
    return (
        <>
            <div className='leading-10 mt-1 text-center '>
                <h2>Parameters</h2>
            </div>
            <div
                className='
                    w-full h-full p-4
                    col-span-4 border border-gray-600 rounded-lg
                '>
                <div className='grid grid-cols-4 gap-2'>
                    <div
                        className="
                            col-span-3
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
                        ">additionalProperties</div>
                    <input
                        type="text"
                        defaultValue={parameters?.required.join(',')}
                        className="
                            col-span-3
                            py-2 px-4 block w-full
                            border-gray-200 rounded-lg
                            text-sm focus:border-blue-500 focus:ring-blue-500
                            disabled:opacity-50 disabled:pointer-events-none
                            dark:bg-gray-600 dark:border-neutral-700
                            dark:text-neutral-400 dark:placeholder-neutral-500
                            dark:focus:ring-neutral-600
                        "
                        onChange={(e) => {
                            dispatch({
                                type: 'Tools/updateEditor',
                                payload: {
                                    id: 0,
                                    parameters: {
                                        required: e.target.value.split(',')
                                    }
                                }
                            })
                        }}
                    />
                    <input
                        type="checkbox"
                        defaultChecked={parameters?.additionalProperties}
                        className="
                            col-span-1
                            py-1 px-2 block w-full
                            border-gray-200 rounded-lg
                            text-sm focus:border-blue-500 focus:ring-blue-500
                            disabled:opacity-50 disabled:pointer-events-none
                            dark:bg-gray-600 dark:border-neutral-700
                            dark:text-neutral-400 dark:placeholder-neutral-500
                            dark:focus:ring-neutral-600
                        "
                        onChange={(e) => {
                            dispatch({
                                type: 'Tools/updateEditor',
                                payload: {
                                    id: 0,
                                    parameters: {
                                        additionalProperties: e.target.checked
                                    }
                                }
                            })
                        }}
                    />
                    </div>
                    <div className='col-span-5'>
                        <div
                            className="
                                col-span-1
                                block h-4 mb-4 mt-6
                                text-lg text-gray-700 font-medium text-center
                                dark:text-white
                            ">properties
                            <button
                                className='
                                py-1 px-4 ml-4 inline-flex items-center gap-x-2
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
                                Add
                            </button>    
                        </div>
                        <div className='grid grid-cols-3 gap-2'>
                            <div
                                className="
                                    col-span-1
                                    block h-4 mb-2
                                    text-lg text-gray-700 font-medium text-center
                                    dark:text-white
                                ">key</div>
                            <div
                                className="
                                    col-span-1
                                    block h-4 mb-2
                                    text-lg text-gray-700 font-medium text-center
                                    dark:text-white
                                ">type</div>
                            <div
                                className="
                                    col-span-1
                                    block h-4 mb-2
                                    text-lg text-gray-700 font-medium text-center
                                    dark:text-white
                                ">description</div>
                            <input
                                type="text"
                                className="
                                    col-span-1
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
                                className="
                                    col-span-1
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
                                className="
                                    col-span-1
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
                    </div>
                {params}
            </div>
        </>
    )
}

export default ToolEditorProperties
