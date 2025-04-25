import React, { JSX, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'

// import helper

// import reducer

// import component
import FileList from './FileList'
import FileScreen from './FileScreen'
import FileForm from './FileForm'

export const File = (): JSX.Element => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'FileAction/initialLoad',
        })
    }, [])

    return (
        <div className='
        flex flex-col lg:flex-row lg:flex-wrap
        w-svw max-h-[95vh] 
        '>
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
                    <FileList />
                </div>
            </div>
            <div 
                className="flex-1 mt-10 p-6">
                <div className='
                    grid grid-cols-1 w-[80%] mx-auto
                '>
                    <FileForm />
                </div>
            </div>
            <FileScreen />
        </div>
    )
}

export default File
