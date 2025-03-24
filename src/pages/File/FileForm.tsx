import React, { useEffect } from 'react'

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
    const store = useSelector(
        (state: FileFormPropsInterface): FileFormInterface => 
            state.FileForm === undefined ? initialState : state.FileForm
    )

    return (
        <div className=''>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* store name */}
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

                            placeholder="Enter store name"
                            className="
                                peer block w-full rounded-md border border-gray-200 py-2 pl-10
                                text-sm text-gray-700 outline-2 placeholder:text-gray-700"
                            aria-describedby='amount-error'
                            onChange={(e) => {
                                dispatch({
                                    type: 'VectorStoreForm/update',
                                    payload: {
                                        name: e.target.value
                                    }
                                })
                            }}
                        />
                        </div>
                    </div>
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
                    Close
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
                            type: 'VectorStoreAction/newStore',
                        })
                    }}
                >
                    Create
                </button>
            </div>
        </div>
    )
}

export default FileForm
