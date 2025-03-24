import React, { JSX } from 'react'
import { useDispatch } from 'react-redux'

// import reducer

// import component

export const ControlPanel = (): JSX.Element => {
    const dispatch = useDispatch()

    return (
        <div
            className='
                absolute bottom-2 right-4
                w-1/3 h-[60px] p-2
                grid grid-cols-3 gap-2
                bg-gray-800 bg-opacity-95
            '>

            <div
                className='
                    w-full h-10 p-2 m-1
                    bg-gray-500 bg-opacity-95
                    text-sm text-center text-gray-300
                    hover:bg-gray-700 hover:bg-opacity-95
                    cursor-pointer
                '
                onClick={() => {
                    dispatch({
                        type: 'VectorStoreAction/beginNew',
                    })
                }}
            >
                new store
            </div>
            <div
                className='
                w-full h-10 p-2 m-1
                bg-gray-500 bg-opacity-95
                text-sm text-center text-gray-300
                hover:bg-gray-700 hover:bg-opacity-95
                cursor-pointer
            '
                onClick={() => {
                    dispatch({
                        type: 'VectorFileAction/beginNew',
                    })
                }}
            >
                new file
            </div>
            <div
                className='
                w-full h-10 p-2 m-1
                bg-gray-500 bg-opacity-95
                text-sm text-center text-gray-300
                hover:bg-gray-700 hover:bg-opacity-95
                cursor-pointer
            '
                onClick={() => {
                    dispatch({
                        type: 'VectorBatchAction/beginNew',
                    })
                }}
            >
                new batch
            </div>

        </div>
    )
}

export default ControlPanel
