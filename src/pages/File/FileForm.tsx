import React, { JSX, useEffect } from 'react'
import { Dispatch } from '@reduxjs/toolkit'

// import helper

// import reducer
import {
    FileFormPropsInterface,
    FileFormInterface,
    initialState
} from '../../_domain/file/reducers/FileForm'
import { useDispatch, useSelector } from 'react-redux'

// import component

export const FileForm = () => {
    const dispatch = useDispatch()
    const files = useSelector(
        (state: FileFormPropsInterface): FileFormInterface => 
            state.FileForm === undefined ? initialState : state.FileForm
    )

    return (
        <div className=''>
            <div className="rounded-md bg-gray-100 p-4 md:p-6">
                {/* store name */}
                <div className="mb-4">
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <div
                                className="
                                    w-full h-40 peer block w-full rounded-md border border-gray-600 py-2 pt-12
                                    text-center outline-2 placeholder:text-gray-700
                                    hover:bg-gray-200 cursor-pointer"
                                aria-describedby='amount-error'
                                onDragOver={(e) => {
                                    e.preventDefault()
                                }}
                                onDrop={(e) => {
                                    onDragEnd(e, dispatch)
                                }}   
                            >
                                <p className='text-gray-400'>Drag Here</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    {(files.files.length === 0) ? <p>none</p> : fileList(files, dispatch)}
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <button
                    className="
                        flex h-10 items-center rounded-lg bg-gray-100
                        px-4 text-sm font-medium text-gray-600 transition-colors
                        hover:bg-gray-200"
                    onClick={() => {
                        dispatch({
                            type: 'VectorStoreAction/closeScreen',
                        })
                    }}
                >
                    Clear
                </button>
                <button
                    className='
                        flex h-10 items-center rounded-lg bg-blue-500
                        px-4 text-sm font-medium text-white transition-colors
                        hover:bg-blue-400 focus-visible:outline focus-visible:outline-2
                        focus-visible:outline-offset-2 focus-visible:outline-blue-500
                        active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
                    onClick={() => {
                        dispatch({
                            type: 'FileAction/upload',
                        })
                    }}
                >
                    Upload
                </button>
            </div>
        </div>
    )
}

const fileList = (files: FileFormInterface, dispatch: Dispatch): JSX.Element => {
    return (
        <table className="hidden min-w-full text-gray-100 bg-gray-600 md:table rounded-md">
            <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                <th scope="col" className="px-3 py-2 font-medium">
                    Name
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                    Files
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                    Bytes
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">del</span>
                </th>
                </tr>
            </thead>
            <tbody
                className="
                    bg-gray-700 text-gray-100
                    text-sm font-normal
                ">
                {files.files.map((val, index) => (
                <tr
                    key={index}
                    className="
                        w-full border-b py-3
                        text-sm last-of-type:border-none
                        [&:first-child>td:first-child]:rounded-tl-lg
                        [&:first-child>td:last-child]:rounded-tr-lg
                        [&:last-child>td:first-child]:rounded-bl-lg
                        [&:last-child>td:last-child]:rounded-br-lg"
                >
                    <td className="whitespace-nowrap px-3 py-3">
                        {val.name.length > 15 ? `${val.name.substring(0, 15)}...` : val.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                        <p className="text-sm text-gray-500">{ val.type }</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                        <p className="text-sm text-gray-500">{ val.size }</p>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                            <button
                                className="
                                    w-15 h-6
                                    rounded-md border p-2
                                    hover:bg-gray-600"
                                onClick={() => {
                                    dispatch({
                                        type: 'FileForm/remove',
                                        payload: index
                                    })
                                }}>
                                <p
                                    className="
                                        -mt-1
                                        text-gray-100 text-sm font-medium
                                        leading-1
                                    "
                                >Del</p>
                            </button>
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    )
}

const onDragEnd = (
    e: React.DragEvent | DragEvent,
    dispatch: Dispatch
): void => {
    e.preventDefault()
    
    dispatch({
        type    : 'FileAction/dragEnd',
        event   : e,
    })
    e.stopPropagation()
}

export default FileForm
