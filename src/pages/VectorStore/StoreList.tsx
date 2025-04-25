import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import helper

// import reducer
import {
    VectorStoreInterface,
    VectorStorePropsInterface,
    initialState
} from '../../_domain/vectorStore/reducers/VectorStore'
import { useDispatch, useSelector } from 'react-redux'


// import component

export const StoreList = () => {
    const dispatch = useDispatch()
    const stores = useSelector((state: VectorStorePropsInterface): VectorStoreInterface => 
        state.VectorStore === undefined ? initialState : state.VectorStore
    )

    if (stores.VectorStores.length === 0)
        return <div className='flex flex-row gap-4'>none</div>

    return (
    <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-900 p-2 md:pt-0">
                <div className="md:hidden">
                {stores.VectorStores.map((store) => (
                    <div
                        key={store.id}
                        className="mb-2 w-full rounded-md bg-white p-4"
                    >
                        <div className="flex items-center justify-between border-b pb-4">
                            <div className="mb-2 flex items-center">
                                <p>{store.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{store.file_counts.total}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{store.usage_bytes}</p>
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
                        <th scope="col" className="px-4 py-2 font-medium sm:pl-6">
                            ID
                        </th>
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
                    <tbody className="bg-gray-800 text-gray-100 ">
                        {stores.VectorStores.map((store) => (
                        <tr
                            key={store.id}
                            className="
                                w-full border-b py-3
                                last-of-type:border-none
                                [&:first-child>td:first-child]:rounded-tl-lg
                                [&:first-child>td:last-child]:rounded-tr-lg
                                [&:last-child>td:first-child]:rounded-bl-lg
                                [&:last-child>td:last-child]:rounded-br-lg"
                        >
                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                <div
                                    className="flex items-center gap-3 cursor-pointer"
                                    onClick={() => {
                                        dispatch({
                                            type: 'VectorFile/storeID',
                                            payload: store.id
                                        })
                                    }}>
                                    <p>{ store.id.length > 5 ? ` ${ store.id.substring(0, 5) }... ` : store.id }</p>
                                </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-3">
                                {store.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-3">
                                <p className="text-sm text-gray-500">{store.file_counts.total}</p>
                            </td>
                            <td className="whitespace-nowrap px-3 py-3">
                                <p className="text-sm text-gray-500">{store.usage_bytes}</p>
                            </td>
                            <td className="whitespace-nowrap py-3 pr-3">
                                <div className="flex justify-end gap-3">
                                    <button
                                        className="
                                            w-15 h-6
                                            rounded-md border 
                                            hover:bg-gray-600
                                            cursor-pointer"
                                        onClick={() => {
                                            dispatch({
                                                type: 'VectorStoreAction/beginEdit',
                                                payload: store.id
                                            })
                                        }}>
                                        <p
                                            className="
                                                -mt-1
                                                text-gray-100 text-sm font-medium
                                                leading-1
                                            ">Edit</p>
                                    </button>
                                    <button
                                        className="
                                            w-15 h-6
                                            rounded-md border p-2
                                            hover:bg-gray-600">
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
            </div>
        </div>
    </div>
    )
}

export default StoreList