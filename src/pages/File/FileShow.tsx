import React, { useEffect } from 'react'

// import helper

// import reducer
import {
    FileShowPropsInterface,
    FileShowInterface,
    initialState
} from '../../_domain/file/reducers/FileShow'
import { useDispatch, useSelector } from 'react-redux'


// import component

export const FileShow = () => {
    const dispatch = useDispatch()
    const file = useSelector((state: FileShowPropsInterface): FileShowInterface => {
        return state.FileShow === undefined ? initialState : state.FileShow
    })

    console.log(file)

    if (!file)
        return <div className='flex flex-row gap-4'>none</div>

    return (
        <div className=''>
            <div
                className="
                    grid grid-cols-4 gap-4
                    w-2/3 mx-auto
                    rounded-md bg-gray-800 p-4 md:p-6
                    ">
    
                <div
                    className="p-2 block text font-medium">
                    ID
                </div>
                <div className="col-span-3 bg-gray-700 rounded-md">
                    <p
                        className="
                            peer block w-full
                            py-2 pl-10
                            text-sm "
                    >
                        {file.id}
                    </p>
                </div>
                <div
                    className="p-2 block text font-medium">
                    Name
                </div>
                <div className="col-span-3 bg-gray-700 rounded-md">
                    <p
                        className="
                            peer block w-full
                            py-2 pl-10
                            text-sm "
                    >
                        {file.filename}
                    </p>
                </div>

                <div className="p-2 block text-sm font-medium">
                Byte
                </div>
                <div className="col-span-3 bg-gray-700 rounded-md">
                    <p
                        className="
                            peer block w-full
                            py-2 pl-10
                            text-sm"
                    >
                        {file.bytes}
                    </p>
                </div>

                <div className="p-2 block text-sm font-medium">
                Purpose
                </div>
                <div className="col-span-3 bg-gray-700 rounded-md">
                    <p
                        className="
                            peer block w-full
                            py-2 pl-10
                            text-sm"
                    >
                        {file.purpose}
                    </p>
                </div>

                <div className="p-2 block text-sm font-medium">
                    Created
                </div>
                <div className="col-span-3 bg-gray-700 rounded-md">
                    <p
                        className="
                            peer block w-full
                            py-2 pl-10
                            text-sm"
                    >
                        {file.created_at}
                    </p>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <button
                    className="
                        flex h-10 items-center rounded-lg
                        bg-gray-100 px-4
                        text-sm font-medium text-gray-600
                        transition-colors hover:bg-gray-200
                        cursor-pointer
                        "
                    onClick={() => {
                        dispatch({
                            type: 'FileScreen/reset',
                        })
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default FileShow