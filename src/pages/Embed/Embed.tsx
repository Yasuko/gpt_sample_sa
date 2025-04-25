import React, { JSX, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'

// import reducer
import {
    EmbedFormPropsInterface,
    EmbedFormInterface,
    initialState
} from '../../_domain/embed/reducers/EmbedForm'

// import component
import Option from './Option'
import DocList from './DocList'

export const Embed = (): JSX.Element => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'TokenAction/checkToken',
            payload: { redirect: '/Embed' }
        })
    })

    const ef = useSelector((state: EmbedFormPropsInterface): EmbedFormInterface => {
        return state.EmbedForm === undefined ? initialState : state.EmbedForm
    })
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
                    grid grid-cols-2 w-full
                    p-4
                    overflow-y-auto overflow-x-hidden
                '>
                    <h1 className="
                        col-span-2
                        text-4xl text-left
                        text-gray-600
                        ">Embed</h1>
                    <div
                        id="File1b"
                        className="
                            col-span-2 mx-2
                            text-center leading-10 text-gray-500
                            w-full h-[200px] border border-gray-500 rounded
                        "
                        onDragOver={(e: React.DragEvent) => onDragStart(e, dispatch)}
                        onDrop={(e: React.DragEvent) => onDragEnd(e, dispatch)}
                    >
                        Drag Area<br></br>
                        (Support type txt, pdf, )
                    </div>

                    <textarea
                        cols={80}
                        rows={8}
                        className="
                            w-full mx-2 my-4 col-span-2 p-4
                            rounded-lg bg-gray-800"
                        id="embedBaseText"
                        placeholder="Enter Base text"
                        defaultValue={ef.input}
                        />
                    <button
                        className='
                        ml-6 mr-4 py-2 px-4 inline-flex items-center gap-x-2
                        text-sm font-medium text-white
                        rounded-lg border border-transparent
                        bg-blue-600 
                        hover:bg-blue-700 focus:outline-none focus:bg-blue-700
                        disabled:opacity-50 disabled:pointer-events-none
                        '
                        onClick={() => {
                            dispatch({
                                type: 'EmbedAction/send',
                                input: getBaseText()
                            })
                            clear()
                        }}>
                        Add
                    </button>
                    <button
                        className='
                        py-2 px-4 inline-flex items-center gap-x-2
                        text-sm font-medium text-gray-500
                        rounded-lg border border-gray-200
                        hover:border-blue-600 hover:text-blue-600
                        focus:outline-none focus:border-blue-600 focus:text-blue-600
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:border-neutral-700 dark:text-neutral-400
                        dark:hover:text-blue-500 dark:hover:border-blue-600
                        dark:focus:text-blue-500 dark:focus:border-blue-600
                        '
                        onClick={() => {
                            /*dispatch({
                                type: 'ChatForm/reset'
                            })*/
                            clear()
                        }}>
                        Clear
                    </button>
                    <Option />
                </div>
            </div>
            <div 
                className="flex-2 ml-10 mr-16">
                <DocList />
            </div>
        </div>
    )
}

const clear = () => {
    const t = document.getElementById('embedBaseText') as HTMLTextAreaElement
    t.value = ''
}

const getBaseText = () => {
    const t = document.getElementById('embedBaseText') as HTMLTextAreaElement
    return t.value
}

const onDragStart = (
    e: React.DragEvent | DragEvent,
    dispatch: Dispatch
): void => {
    e.preventDefault()
    dispatch({
        type    : 'EmbedAction/dragStart',
        event   : e,
    })
}

const onDragEnd = (
    e: React.DragEvent | DragEvent,
    dispatch: Dispatch
): void => {
    e.preventDefault()
    
    dispatch({
        type    : 'EmbedAction/dragEnd',
        event   : e,
    })
    e.stopPropagation()
}

export default Embed


