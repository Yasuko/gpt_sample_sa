import { JSX } from 'react'

// import helper

// import reducer
import {
    Chat,
} from '../../_domain/chatAdvance/reducers/__type.chat'
import { AssistantMessageType, ToolMessageType, UserMessageType } from '../../_lib/gpt/_helper/chat.helper'


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
        case 'developer':
            return DeveloperContent(lists.content)
        case 'user':
            return UserContent(lists.content)
        case 'assistant':
            return AssistantContent(lists.content)
        case 'system':
            return SystemContent(lists.content)
        case 'tool':
            return ToolContent(lists.content)
        default:
            return <div></div>
    }
}

const DeveloperContent = (
    ct: string,
): JSX.Element => {
    return (
        <div className="flex gap-x-2 sm:gap-x-4 mt-4 ml-6">
            <span className="
                shrink-0 inline-flex items-center justify-center
                size-[38px] rounded-full bg-green-600">
                <span className="
                    text-sm font-medium text-white leading-none">
                    Developer
                </span>
            </span>
            <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
                <div className="inline-block bg-gray-600 rounded-lg p-4 shadow-sm">
                    <pre className='text-sm text-white'>
                        {ct}
                    </pre>
                </div>
            </div>
        </div>
    )
}

const SystemContent = (ct: string): JSX.Element => {
    return (
        <div className="flex gap-x-2 sm:gap-x-4 mt-4 ml-6">
            <span className="
                shrink-0 inline-flex items-center justify-center
                size-[38px] rounded-full bg-purple-600">
                <span className="
                    text-sm font-medium text-white leading-none">
                    GPT
                </span>
            </span>
            <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
                <div className="inline-block bg-gray-600 rounded-lg p-4 shadow-sm">
                    <pre className='text-sm text-white'>
                        {ct}
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
        <div className="grow text-end space-y-3">
            { UserContentList(ct) }
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



const AssistantContent = (ct: AssistantMessageType['content']): JSX.Element => {
    return (
        <div className="flex gap-x-2 sm:gap-x-4 mt-4 ml-6">
            <span className="
                shrink-0 inline-flex items-center justify-center
                size-[38px] rounded-full bg-yellow-600">
                <span className="
                    text-sm font-medium text-white leading-none">
                    Assistant
                </span>
            </span>
            <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
                { AssistantContentList(ct) }
            </div>
        </div>
    )
}

const ToolContent = (ct: ToolMessageType['content']): JSX.Element => {
    return (
        <div className="flex gap-x-2 sm:gap-x-4 mt-4 ml-6">
            <span className="
                shrink-0 inline-flex items-center justify-center
                size-[38px] rounded-full bg-blue-600">
                <span className="
                    text-sm font-medium text-white leading-none">
                    Tool
                </span>
            </span>
            <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
                { ToolContentList(ct) }
            </div>
        </div>
    )
}

const UserContentList = (ct: UserMessageType['content']): JSX.Element => {
    const c = ct.map((val, key) => {
        switch (val.type) {
            case 'text':
                return (
                    <div key={key} className="inline-block bg-gray-600 rounded-lg p-4 shadow-sm">
                        <pre className='text-sm text-white'>{val.text}</pre>
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
        <div className=''>
            {c}
        </div>
    )
}

const AssistantContentList = (ct: AssistantMessageType['content']): JSX.Element => {
    if (typeof ct === 'string')
        return (
            <div className="inline-block bg-gray-600 rounded-lg p-4 shadow-sm">
                <pre className='text-sm text-white'>{ct}</pre>
            </div>
        )

    const c = ct.map((val, key) => {
        if (!('refusal' in val)) {
            return (
                <div key={key} className="inline-block bg-gray-600 rounded-lg p-4 shadow-sm">
                    <pre className='text-sm text-white'>
                        {val.type} : {val.text}
                    </pre>
                </div>
            )
        } else {
            return (
                <div key={key} className="inline-block bg-gray-600 rounded-lg p-4 shadow-sm">
                    <pre className='text-sm text-tomato'>
                        {val.type} : {val.refusal}
                    </pre>
                </div>
            )
        }
    })
    return (
        <div className=''>
            {c}
        </div>
    )
}

const ToolContentList = (ct: ToolMessageType['content']): JSX.Element => {
    if (typeof ct === 'string')
        return (
            <div className="inline-block bg-gray-600 rounded-lg p-4 shadow-sm">
                <pre className='text-sm text-white'>{ct}</pre>
            </div>
        )

    const c = ct.map((val, key) => {
        return (
            <div key={key} className="inline-block bg-gray-600 rounded-lg p-4 shadow-sm">
                <pre className='text-sm text-tomato'>
                    {val.type} : {val.text}
                </pre>
            </div>
        )
    })
    return (
        <div className=''>
            {c}
        </div>
    )
}

export default ChatList