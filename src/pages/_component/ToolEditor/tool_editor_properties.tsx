import { JSX } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'

import { ToolType } from '../../../_lib/gpt/_helper/chat.helper'

import {
    EditToolType,
} from '../../../_domain/_all/reducers/Tools'


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
    console.log('ToolEditorProperties', parameters, properties)
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
                    <div className='col-span-5'>
                        <div
                            className="
                                col-span-1
                                block h-4 mb-4 mt-0
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
                                            properties: getProperties()
                                        }
                                    })
                                }}
                                >
                                Add
                            </button>
                            <div
                                className="
                                    block h-4 ml-8 -mt-4 mb-2
                                    flex inline-flex items-center justify-center
                                    text-sm text-gray-700 font-medium text-center
                                    dark:text-white
                                ">
                                    <div className='mr-4 '>additionalProperties</div>
                                    <input
                                        type="checkbox"
                                        defaultChecked={parameters.additionalProperties}
                                        className="
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
                                                type: 'Tools/updateParameters',
                                                payload: {
                                                        additionalProperties: e.target.checked
                                                }
                                            })
                                        }}
                                    />
                            </div>
                        </div>
                        <div className='grid grid-cols-7 gap-2'>
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
                                    col-span-4
                                    block h-4 mb-2
                                    text-lg text-gray-700 font-medium text-center
                                    dark:text-white
                                ">description</div>
                            <div
                                className='
                                    col-span-1
                                    w-full
                                    block h-4 mb-2
                                    text-lg text-gray-700 font-medium text-center
                                    dark:text-white
                                '>ctrl</div>
                            <input
                                type="text"
                                id='tool-properties-key'
                                className="
                                    col-span-1
                                    py-2 px-2 block w-full
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
                                id='tool-properties-type'
                                className="
                                    col-span-1
                                    py-2 px-2 block w-full
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
                                id='tool-properties-description'
                                className="
                                    col-span-4
                                    py-2 px-2 block w-full
                                    border-gray-200 rounded-lg
                                    text-sm focus:border-blue-500 focus:ring-blue-500
                                    disabled:opacity-50 disabled:pointer-events-none
                                    dark:bg-gray-600 dark:border-neutral-700
                                    dark:text-neutral-400 dark:placeholder-neutral-500
                                    dark:focus:ring-neutral-600
                                "
                            />
                            <div
                                className='
                                    col-span-1
                                    w-10'>
                            </div>
                        </div>
                    </div>
                {propertiesList(properties, parameters.required, dispatch)}
            </div>
        </>
    )
}


const propertiesList = (
    properties: ToolEditorPropertiesState['properties'],
    required: ToolEditorPropertiesState['parameters']['required'],
    dispatch: Dispatch
): JSX.Element => {
    let params = <div>none....</div>
    if (Object.keys(properties).length > 0) {
        let index = 0
        const list = Object.keys(properties).map((val, key) => {
            index++
            return (
                <div key={index} className='grid grid-cols-7 gap-2 mt-1'>
                    <input
                        type='text'
                        defaultValue={val}
                        className='
                            col-span-1
                            py-1 px-2 block w-full
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
                        defaultValue={properties[val].type}
                        className='
                            col-span-1
                            py-1 px-2 block w-full
                            border-gray-200 rounded-lg
                            text-sm focus:border-blue-500 focus:ring-blue-500
                            disabled:opacity-50 disabled:pointer-events-none
                            dark:bg-gray-600 dark:border-neutral-700
                            dark:text-neutral-400 dark:placeholder-neutral-500
                            dark:focus:ring-neutral-600'
                        />
                    <input
                        type='text'
                        defaultValue={properties[val].description}
                        className='
                            col-span-4
                            py-1 px-2 block w-full
                            border-gray-200 rounded-lg
                            text-sm focus:border-blue-500 focus:ring-blue-500
                            disabled:opacity-50 disabled:pointer-events-none
                            dark:bg-gray-600 dark:border-neutral-700
                            dark:text-neutral-400 dark:placeholder-neutral-500
                            dark:focus:ring-neutral-600'
                        />
                    <div
                        className='
                            col-span-1
                            w-full 
                            grid grid-cols-2 gap-2
                            text-sm font-medium text-gray-300 text-center
                            '>
                        <div className='
                                w-full px-2
                                items-center justify-center
                            '>
                            <div className=' py-0'>req</div>
                            <input
                                type="checkbox"
                                defaultChecked={checkRequired(val, required)}
                                className="
                                    py-0 px-1 block w-full
                                    border-gray-200 rounded-lg
                                    text-sm focus:border-blue-500 focus:ring-blue-500
                                    disabled:opacity-50 disabled:pointer-events-none
                                    dark:bg-gray-600 dark:border-neutral-700
                                    dark:text-neutral-400 dark:placeholder-neutral-500
                                    dark:focus:ring-neutral-600
                                "
                                onChange={(e) => {
                                    dispatch({
                                        type: 'Tools/updateParameters',
                                        payload: {
                                            required: toggleRequired(val, required)
                                        }
                                    })
                                }}
                            />
                        </div>
                        <button
                            className='
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
                </div>
            )
        })
        return (
            <div>
                { list }
            </div>
        )
    }
    return params
}

const checkRequired = (
    key: string,
    required: string[]
): boolean => {
    return required.includes(key)
}

const toggleRequired = (
    key: string,
    required: string[]
): string[] => {
    if (required.includes(key)) {
        return required.filter((val) => val !== key)
    }
    return required.concat(key)
}

const getProperties = () => {
    const key = document.getElementById('tool-properties-key') as HTMLInputElement
    const type = document.getElementById('tool-properties-type') as HTMLInputElement
    const description = document.getElementById('tool-properties-description') as HTMLInputElement

    const properties = {
        key: key.value,
        type: type.value,
        description: description.value
    }
    key.value = ''
    type.value = ''
    description.value = ''

    return properties
}

export default ToolEditorProperties
