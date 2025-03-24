import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import reducer
import {
    FileScreenPropsInterface,
    FileScreenInterface,
    initialState
} from '../../_domain/file/reducers/FileScreen'

// import component
import FileForm from './FileForm'
import FileEdit from './FileEdit'


export const FileScreen = () => {

    const screen = useSelector((state: FileScreenPropsInterface): FileScreenInterface => {
        return state.FileScreen === undefined ? initialState : state.FileScreen
    })

    if (screen.show === false) return <></>

    return (
        <div className="
        absolute top-[10%] 
        w-full min-w-[300px] h-full bg-gray-800 bg-opacity-95
        rounded-lg p-20
        gap-4">
            <div className='w-full ms-auto flex justify-center gap-x-2 mb-4'>
                <h1>Vector Store Screen</h1>
            </div>
            { ComponentSwitch(screen.target) }

        </div>
    )
}

const ComponentSwitch = (content: string) => {
    switch (content) {
        case 'store_form':
            return <FileForm />
        case 'store_edit':
            return <FileEdit />
        default:
            return <></>
    }
}

export default FileScreen