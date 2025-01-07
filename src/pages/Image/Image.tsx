import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import reducer
import {
    ImageScreenPropsInterface,
    ImageScreenInterface,
    initialState as initialScreen
} from '../../_domain/image/reducers/ImageScreen'

// import Hook

// import component
import Option from './Option'
import OptionEdit from './OptionEdit'
import OptionChange from './OptionChange'
import ListImage from './ListImage'

export const Image = (): JSX.Element => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'TokenAction/checkToken',
            return: 'Image'
        })
    })

    const is = useSelector((state: ImageScreenPropsInterface): ImageScreenInterface => {
        return state.ImageScreen === undefined ? initialScreen : state.ImageScreen
    })
    return (
        <div className='
            grid grid-rows-3 grid-cols-3 gap4
            w-full h-[90vh]
        '>
            <div className='row-span-3 col-span-1'>
                <div className="form-row align-items-center">
                    <h1 className="
                    m-2
                    text-4xl text-left
                    text-gray-600
                    ">Image</h1>
                    <button
                        className='
                            ms-1 py-2 px-4 inline-flex items-center gap-x-2
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
                            dispatch({
                                type: 'ImageScreen/showBase'
                            })
                        }}
                        >Generate</button>
                    <button
                        className='
                            ms-4 py-2 px-4 inline-flex items-center gap-x-2
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
                            dispatch({
                                type: 'ImageScreen/showEdit'
                            })
                        }}
                        >Edit</button>
                    <button
                        className='
                            ms-4 py-2 px-4 inline-flex items-center gap-x-2
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
                            dispatch({
                                type: 'ImageScreen/showChange'
                            })
                        }}
                        >Change</button>
                </div>
                { OptionChanger(is)}
            </div>
            <div className='row-span-3 col-span-2'>
                <ListImage />
            </div>
        </div>
    )
}

const OptionChanger = (is: ImageScreenInterface): JSX.Element => {
    if (is.base) return <Option />
    if (is.edit) return <OptionEdit />
    if (is.change)return <OptionChange />
    return <></>
}

export default Image

