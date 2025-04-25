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

export const FileSelect = ({
    next,
    multiple = false
}: {
    next: string,
    multiple?: boolean
}) => {

    const dispatch = useDispatch()
    const files = useSelector((state: FilesPropsInterface): FilesInterface => {
        return state.Files === undefined ? initialState : state.Files
    })

    useEffect(() => {
        if (files.files.length === 0)
            dispatch({ type: 'FileAction/initialLoad' })
    })

    if (files.files.length === 0)
        return <div className='flex flex-row gap-4'>none</div>

    return (
    <div className="mt-2 flow-root">
        <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-700 p-2 ">
                <select
                    className="
                        block w-full    
                        rounded-md border border-gray-200
                        py-2 pl-10 text-sm text-gray-100
                        "
                    multiple={multiple}
                    onChange={(e) => {
                        dispatch({
                            type: next,
                            payload: {
                                file_id: e.target.value
                            }
                        })
                    }}
                >
                    <option key={-1} value={'none'}>select....</option>
                    {files.files.map((val) => (
                        <option key={val.id} value={val.id}>
                            {val.filename}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    </div>
    )
}

export default FileSelect