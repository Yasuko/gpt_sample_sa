import React, { useEffect } from 'react'

// import helper

// import reducer
import {
    FilesPropsInterface,
    FilesInterface,
    initialState
} from '../../_domain/file/reducers/Files'
import { useDispatch, useSelector } from 'react-redux'


// import component

export const FileList = () => {

    const dispatch = useDispatch()
    const files = useSelector((state: FilesPropsInterface): FilesInterface => {
        return state.Files === undefined ? initialState : state.Files
    })

    useEffect(() => {
        if (files.files.length === 0)
            dispatch({ type: 'VectorFileAction/initialLoad' })
    })

    if (files.files.length === 0)
        return <div className='flex flex-row gap-4'>none</div>

    return (
    <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-900 p-2 md:pt-0">
                <div className="md:hidden">
                {files.files.map((val) => (
                    <div
                        key={val.id}
                        className="mb-2 w-full rounded-md bg-white p-4"
                    >
                        <div className="flex items-center justify-between border-b pb-4">
                            <div className="mb-2 flex items-center">
                                <p>{val.id}</p>
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-between pt-4">
                            <div className="flex justify-end gap-2">
                                <button className="rounded-md border p-2 hover:bg-gray-100">
                                    <span className="sr-only">Edit</span>
                                </button>
                                <button className="rounded-md border p-2 hover:bg-gray-100">
                                    <span className="sr-only">Del</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                <table className="hidden min-w-full text-gray-100 md:table">
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
                            <span className="sr-only">Edit</span>
                        </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 text-gray-100 text-sm font-normal">
                        {files.files.map((val) => (
                        <tr
                            key={val.id}
                            className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                        >
                            <td
                                className="whitespace-nowrap px-3 py-3 cursor-pointer"
                                onClick={() => {
                                    dispatch({
                                        type: 'FileAction/show',
                                        payload: val.id
                                    })
                                }}>
                                {val.filename.length > 20 ? `${val.filename.substring(0, 20)}...` : val.filename}
                            </td>
                            <td className="whitespace-nowrap px-3 py-3">
                                <p className="text-sm text-gray-500">{val.bytes}</p>
                            </td>
                            <td className="whitespace-nowrap px-3 py-3">
                                <p className="text-sm text-gray-500">{val.created_at}</p>
                            </td>
                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                <div className="flex justify-end gap-3">
                                    <button
                                        className="
                                            w-15 h-6
                                            rounded-md border 
                                            hover:bg-gray-600
                                            cursor-pointer"
                                        onClick={() => {
                                            dispatch({
                                                type: 'FileAction/download',
                                                payload: val.id
                                            })
                                        }}>
                                        <p
                                            className="
                                                -mt-1
                                                text-gray-100 text-sm font-medium
                                                leading-1
                                            ">DL</p>
                                    </button>
                                    <button
                                        className="
                                            w-15 h-6
                                            rounded-md border p-2
                                            hover:bg-gray-600
                                            cursor-pointer"
                                        onClick={() => {
                                            dispatch({
                                                type: 'FileAction/remove',
                                                payload: val.id
                                            })
                                        }}>
                                        <p
                                            className="
                                                -mt-1
                                                text-gray-100 text-sm font-medium
                                                leading-1
                                            "
                                        >RM</p>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
}

export default FileList