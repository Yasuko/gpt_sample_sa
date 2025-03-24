import React, { JSX, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'

// import helper

// import reducer

// import component
import StoreList from './StoreList'
import FileList from './FileList'
import VectorStoreScreen from './FileScreen'
import ControlPanel from './ControlPanel'

export const File = (): JSX.Element => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'VectorStoreAction/initialLoad',
        })
    }, [])

    return (
        <div className='
        flex flex-col lg:flex-row lg:flex-wrap
        w-svw max-h-[95vh] 
        '>
            <ControlPanel />
            <div
                className="
                    lg:flex-1
                    hidden lg:flex items-center h-full px-2
                    transition duration-150 ease-in-out
                ">
                <div className='
                    grid grid-cols-1 w-full
                '>
                    <h1 className="
                        text-4xl text-left
                        text-gray-600
                        ">VectorStore</h1>
                    <StoreList />
                </div>
            </div>
            <div 
                className="flex-1 mt-10 ml-10 mr-16">
                <div className='
                    grid grid-cols-1 w-full
                '>
                    <FileList />
                </div>
            </div>
            <VectorStoreScreen />
        </div>
    )
}

const onDragStart = (
    e: React.DragEvent | DragEvent,
    dispatch: Dispatch
): void => {
    e.preventDefault();
    dispatch({
        type    : 'ChatAction/dragStart',
        event   : e,
    })
}

const onDragEnd = (
    e: React.DragEvent | DragEvent,
    dispatch: Dispatch
): void => {
    e.preventDefault()
    
    dispatch({
        type    : 'ChatAction/dragEnd',
        event   : e,
    })
    e.stopPropagation()
}


export default File
