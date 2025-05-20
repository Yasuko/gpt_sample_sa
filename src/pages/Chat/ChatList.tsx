import React, { JSX } from 'react'

// import helper

// import reducer
import {
    Chat,
} from '../../_domain/chat/reducers/__type.chat'
import { AssistantMessageType, ToolMessageType, UserMessageType } from '../../_lib/gpt/_helper/chat.helper'
import { copyToClipboard } from './_handler'


// import component

export const ChatList = (cf: Chat[]) => {

    if (cf.length === 0)
        return <div className='flex flex-row gap-4'>none</div>

    const list = cf.map((val, key) => {
        return (
            <div key={key} className="
            flex flex-row gap-4">
                { RoleSwitch(val) }
            </div>
        )
    })
    return (
        <div className=''>
            {list}
        </div>
    )
}

const RoleSwitch = (lists: Chat): JSX.Element => {
    switch (lists.role) {
        case 'user':
            return UserContent(lists.content)
        case 'system':
            return SystemContent(lists.content)
        default:
            return <div></div>
    }
}

const SystemContent = (ct: string): JSX.Element => {
    console.log(ct)
    return (
        <div className="flex gap-x-2 sm:gap-x-4 mt-4 ml-6">
            <span className="
                shrink-0 inline-flex items-center justify-center
                size-[38px] rounded-full bg-purple-600 hover:bg-purple-700 cursor-pointer">
                <span className="
                    text-sm font-medium text-white leading-none"
                    onClick={() => copyToClipboard(ct)}
                    >
                    Sys
                </span>
            </span>
            <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
                <div className="inline-block bg-gray-600 rounded-lg p-4 shadow-sm">
                    <pre className='text-sm text-white whitespace-pre-wrap'>
                        {ct.length > 30 
                            ? ct.split(' ').reduce((acc, word) => {
                                if ((acc.split('\n').pop() || '').length + word.length > 30) {
                                  return acc + '\n' + word + ' ';
                                }
                                return acc + word + ' ';
                              }, '').trim()
                            : ct
                        }
                    </pre>
                </div>
            </div>
        </div>
    )
}

const UserContent = (ct: UserMessageType['content']): JSX.Element => {
    return (
        <div className="
        max-w-2xl ms-auto flex justify-end gap-x-2
        mt-4 sm:gap-x-4
    ">
        <div className="grid grid-cols-1 grow text-end space-y-3">
            { UserContentList(ct) }
        </div>
        <span className="
            shrink-0 inline-flex items-center justify-center
            size-[38px] rounded-full bg-gray-600">
            <span className="
                text-sm font-medium text-white leading-none">
                Usa
            </span>
        </span>
    </div>
    )
}

const UserContentList = (ct: UserMessageType['content']): JSX.Element => {
    const c = ct.map((val, key) => {
        switch (val.type) {
            case 'text':
                return (
                    <div
                        key={key}
                        className="inline-block bg-gray-600 rounded-lg p-4 shadow-sm"
                        onClick={() => copyToClipboard(val.text)}
                        >
                        <pre className='text-sm text-white whitespace-pre-wrap'>
                            {val.text.length > 30 
                                ? val.text.split(' ').reduce((acc, word) => {
                                    if ((acc.split('\n').pop() || '').length + word.length > 30) {
                                    return acc + '\n' + word + ' ';
                                    }
                                    return acc + word + ' ';
                                }, '').trim()
                                : val.text
                            }
                        </pre>
                    </div>
                )
            case 'image_url':
                return (
                    <div key={key} className="inline-block bg-gray-600 rounded-lg p-4 shadow-sm">
                        <img src={val.image_url?.url} width={200} />
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
        <>
            {c}
        </>
    )
}


export default ChatList