import React from 'react'

// import helper

// import reducer
import { UserMessageType } from '../../_lib/gpt/_helper/chat.helper'
import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'


// import component

export const ChatScreen = ({
    cf,
    screen
}: {
    cf: UserMessageType,
    screen: boolean
}) => {

    if (!screen)
        return <></>

    const dispatch = useDispatch()

    return (
        <div className="
        absolute top-[10%] right-[10%]
        w-[50%] min-w-[300px] h-[50%] bg-gray-800 bg-opacity-95
        rounded-lg p-4
        gap-4">
            <div className='w-full ms-auto flex justify-center gap-x-2'>
                <h1>New Chat Message</h1>
            </div>
            { UserContent(cf.content, dispatch) }
        </div>
    )
}

const UserContent = (
    ct: UserMessageType['content'],
    dispatch: Dispatch
): JSX.Element => {
    return (
        <div
            className="
                w-full ms-auto flex justify-end gap-x-2
                mt-4 sm:gap-x-4
            ">
        <div className="grow text-end space-y-3">
            { UserContentList(ct, dispatch) }
        </div>
        <span className="
            shrink-0 inline-flex items-center justify-center
            size-[38px] rounded-full bg-gray-600">
            <span className="
                text-sm font-medium text-white leading-none">
                User
            </span>
        </span>
    </div>
    )
}

const UserContentList = (
    ct: UserMessageType['content'],
    dispatch: Dispatch
): JSX.Element => {
    const c = ct.map((val, key) => {
        switch (val.type) {
            case 'text':
                return (
                    <div key={key} className="
                        w-full mb-2 inline-block bg-gray-900 rounded-lg p-4 shadow-sm">
                        <pre className='text-sm text-white'>{val.text}</pre>
                    </div>
                )
            case 'image_url':
                return (
                    <div
                        key={key}
                        className="
                            w-full mb-2 inline-block
                            flex inline-flex gap-4
                            bg-gray-900 rounded-lg p-4 shadow-sm
                        ">
                        <img src={val.image_url?.url} width={50} />
                    </div>
                )
            case 'input_audio':
                return (
                    <div key={key} className="inline-block bg-gray-600 rounded-lg p-4 shadow-sm">
                        <audio controls>
                            <source src={val.input_audio.data} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                )
            default:
                return <div></div>
        }
    })
    return (
        <div className=''>
            {c}
        </div>
    )
}


export default ChatScreen