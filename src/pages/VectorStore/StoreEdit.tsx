import React, { useEffect } from 'react'

// import helper

// import reducer
import {
    VectorStoreEditPropsInterface,
    VectorStoreEditInterface,
    initialState
} from '../../_domain/vectorStore/reducers/VectorStoreEdit'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


// import component

export const StoreEdit = () => {
    const dispatch = useDispatch()
    const store = useSelector((state: VectorStoreEditPropsInterface): VectorStoreEditInterface => {
        return state.VectorStoreEdit === undefined ? initialState : state.VectorStoreEdit
    })

    useEffect(() => {
        dispatch({
            type: 'VectorStoreAction/initialLoad',
        })
    })

    if (store.name === '')
        return <div className='flex flex-row gap-4'>none</div>

    return (
        <div className=''>
            <div className="rounded-md bg-gray-800 p-4 md:p-6">
    
                {/* Store Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                        id="name"
                        name="name"
                        type="text"
                        defaultValue={store.name}
                        placeholder="Guest"
                        className="
                            peer block w-full
                            rounded-md border border-gray-200
                            py-2 pl-10
                            text-sm outline-2 placeholder:text-gray-200"
                        />
                    </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <button
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    onClick={() => {
                        dispatch({
                            type: 'VectorStoreScreen/reset',
                        })
                    }}
                >
                    Close
                </button>
                <button
                    className='flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
                >
                    Update
                </button>
            </div>
        </div>
    )
}

export default StoreEdit