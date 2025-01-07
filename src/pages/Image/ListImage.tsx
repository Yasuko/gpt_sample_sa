import React from 'react'
import { useSelector } from 'react-redux'

// import reducer
import {
    ImageListPropsInterface,
    ImageListInterface,
    initialState
} from '../../_domain/image/reducers/ImageList'

// import Hook

export const ListImage = (): JSX.Element => {
    const ifm = useSelector((state: ImageListPropsInterface): ImageListInterface => {
        return state.ImageList === undefined ? initialState : state.ImageList
    })

    return (
        <div className='
        w-full ml-6 mt-4
        bg-gray-800 rounded-lg
        overflow-y-auto overflow-x-hidden

        grid grid-cols-2 sm:grid-cols-3 gap-2
        '>
            { ImageList(ifm) }
        </div>
    )
}

const ImageList = (ifm: ImageListInterface): JSX.Element[] => {
    if (ifm.images.length === 0)  return ([<></>])
    const list = ifm.images.map((val, key) => {
        return (
            <a
                key={key}
                className="
                    block relative
                    w-[150] h-[150]
                    overflow-hidden rounded-lg m-1 border
                "
                href="#"
                onClick={() => {
                    console.log(val)
                }}
            >
                <img
                    className="
                        object-cover bg-gray-100 rounded-lg dark:bg-neutral-800"
                    src={val.image}
                    alt={val.prompt} />
                <div
                    className="
                        absolute bottom-1 end-1
                        opacity-0 group-hover:opacity-100 transition">
                    <div
                        className="
                            flex items-center gap-x-1 py-1 px-2 bg-white
                            border border-gray-200 text-gray-800 rounded-lg
                            dark:bg-neutral-900 dark:border-neutral-700 dark:text-gray-400">
                        <svg
                            className="shrink-0 size-3"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="m21 21-4.3-4.3"/>
                        </svg>
                        <span className="text-xs">View</span>
                    </div>
                </div>
            </a>
        );
    })
    return list
}

export default ListImage
