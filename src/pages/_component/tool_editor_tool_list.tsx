import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'

import { ToolType } from '../../_lib/gpt/_helper/chat.helper'

// import reducer


const ToolEditorToolList = ({
    tools
}: {
    tools: ToolType[]
}): JSX.Element => {
    const dispatch = useDispatch()

    let list = [<div key={0} className='h-4 text-center col-span-8 gap-4'>none</div>]
    if (tools.length > 0) {
        list = tools.map((val, key) => {
            return (
                <div
                    key={key}
                    className='
                        col-span-6 relative float-left
                        h-10 p-0 m-0
                        grid grid-cols-6
                        text-lg text-gray-700 font-medium text-center
                        bg-gray-400
                        dark:text-white
                '>
                    <div
                        className="
                            col-span-2
                            h-8 m-1
                            rounded-lg
                            bg-gray-600
                            cursor-pointer
                            "
                        onClick={() => {
                            dispatch({
                                type: 'Tools/setEditor',
                                payload: key
                            })
                        }}>
                        {val.function.name}
                    </div>
                    <div
                        className="
                            col-span-4
                            h-8 m-1
                            rounded-lg
                            bg-gray-600 
                            ">
                        { splitDescription(val.function.description) }
                    </div>
                </div>
            )
        })
    }
    return (
        <div
            className='
                w-full max-h-[85vh] p-4
                grid grid-cols-6 gap-2
                bg-gray-700 bg-opacity-80
                rounded-lg
                overflow-y-auto overflow-x-hidden
            '>
            <div
                className="
                    col-span-2
                    block h-4 -mt-4 mb-1
                    text-lg text-gray-700 font-medium text-center
                    dark:text-white
                ">name</div>
            <div
                className="
                    col-span-4
                    block h-4 -mt-4 mb-1
                    text-lg text-gray-700 font-medium text-center
                    dark:text-white
                ">description</div>
            {list}
        </div>
    )
}


const splitDescription = (description: string | undefined): string => {
    if (description === undefined) return ''
    return description.length > 20 ? description.substring(0, 20) + '...' : description
}


export default ToolEditorToolList
