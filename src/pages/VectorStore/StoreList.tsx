import React, { useEffect } from 'react'

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
    const store = useSelector((state: VectorStorePropsInterface): VectorStoreInterface => {
        return state.VectorStore === undefined ? initialState : state.VectorStore
    })

    useEffect(() => {
        dispatch({
            type: 'VectorStoreAction/initialLoad',
        })
    })


    if (store.VectorStores.length === 0)
        return <div className='flex flex-row gap-4'>none</div>

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                <div className="md:hidden">
                {store.VectorStores.map((role) => (
                    <div
                    key={role.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                    >
                    <div className="flex items-center justify-between border-b pb-4">
                        <div>
                        <div className="mb-2 flex items-center">
                            <p>{role.name}</p>
                        </div>
                        <p className="text-sm text-gray-500">{role.ring}</p>
                        </div>
                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                        <div className="flex justify-end gap-2">
                        <UpdateButton link={linkMaker('edit', role.id)} />
                        <DeleteButton id={role.id} deleteAction={deleteRole} />
                        </div>
                    </div>
                    </div>
                ))}
                </div>
                <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                    <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                        ID
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                        Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                        Ring
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                        <span className="sr-only">Edit</span>
                    </th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {roles?.data.map((role) => (
                    <tr
                        key={role.id}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                            <p>{role.id}</p>
                        </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                        {role.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                        {role.ring}
                        </td>
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                            <UpdateButton link={linkMaker('edit', role.id)} />
                            <DeleteButton id={role.id} deleteAction={deleteRole} />
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