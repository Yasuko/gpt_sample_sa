import React from 'react'
import { useDispatch } from 'react-redux'

import {
    ResponseFormatInterface,
} from '../../../_domain/_all/reducers/ResponseFormat'
import { isJson } from '../../../_lib/_helper/json.helper'


const ResponseFormatProperties = ({
    schema,
    show
}: {
    schema: ResponseFormatInterface['edit_schema'],
    show: boolean
}): JSX.Element => {

    if (!show) return <></>

    const dispatch = useDispatch()

    return (
        <>
            <div className='leading-10 mt-1 text-center '>
                <h2>Parameters</h2>
            </div>
            <div
                className='
                    w-full h-full p-4
                    col-span-4
                '>
                    <div className='col-span-5'>
                        <div
                            className="
                                col-span-1
                                block h-4 mb-4 mt-0
                                text-lg text-gray-700 font-medium text-center
                                dark:text-white
                            ">schemas
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
                                        type: 'ResponseFormat/addSchemas',
                                        payload: {}
                                    })
                                }}
                                >
                                Save
                            </button>
                        </div>
                        <div className='grid grid-cols-1 gap-2'>
                            <textarea
                                rows={20}
                                cols={70}
                                id='response_format_schemas'
                                defaultValue={JSON.stringify(schema, null, 4)}
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
                                onChange={(e) => {
                                    const schemas = e.target.value
                                    if (!isJson(schemas)) return
                                    dispatch({
                                        type: 'updateEditor/updateEditor',
                                        payload: schemas
                                    })
                                }}
                            />
                            <div
                                className='
                                    col-span-1
                                    w-10'>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default ResponseFormatProperties
