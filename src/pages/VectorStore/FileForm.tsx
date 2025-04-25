import React, { useEffect } from 'react'

// import helper

// import reducer
import {
    VectorFileFormPropsInterface,
    VectorFileFormInterface,
    initialState
} from '../../_domain/vectorStore/reducers/VectorFileForm'
import { useDispatch, useSelector } from 'react-redux'

// import component
import FileSelect from '../File/FileSelect'

export const FileForm = () => {
    const dispatch = useDispatch()
    const file = useSelector(
        (state: VectorFileFormPropsInterface): VectorFileFormInterface => 
            state.VectorFileForm === undefined ? initialState : state.VectorFileForm
    )

    console.log(file)

    return (
        <div className=''>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* store FileID */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        FileID
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <FileSelect next={'VectorFileForm/update'}  />
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
                            type: 'VectorFileAction/compNew',
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
