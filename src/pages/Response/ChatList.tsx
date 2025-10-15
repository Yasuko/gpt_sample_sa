import React, { JSX, useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'

// import helper

// import reducer
import {
    ResponseHistoryInterface, 
} from '../../_domain/response/reducers/ResponseHistory'
import { copyToClipboard } from './_handler'
import { useAppDispatch, useAppSelector } from '@/_store/configureStore'


// import component

export const ChatList = () => {
    const dispatch = useAppDispatch()
    const rh = useAppSelector<ResponseHistoryInterface>(state => state.ResponseHistory)

    const [heights, setHeights] = useState<number[]>([])
    const refs = useRef<(HTMLDivElement | null)[]>([])

    const calculateHeights = useCallback((specificIndex?: number) => {
        setHeights(prevHeights => {
            const newHeights = specificIndex !== undefined ? [...prevHeights] : []
            refs.current.forEach((ref, index) => {
                if (ref && (specificIndex === undefined || specificIndex === index)) {
                    const rect = ref.getBoundingClientRect()
                    let height = rect.height + 50 // 上下50pxずつ追加
                    if (index === rh.historys.length - 1) {
                        height += 450 // 最終段の下に350px追加
                    }
                    if (specificIndex !== undefined) {
                        newHeights[index] = height
                    } else {
                        newHeights.push(height)
                    }
                } else if (specificIndex === undefined) {
                    newHeights.push(0)
                }
            })
            return newHeights
        })
    }, [rh.historys.length])

    useLayoutEffect(() => {
        calculateHeights()
    }, [rh.historys])

    if (rh.historys.length === 0)
        return <div className='flex flex-row gap-4 p-4'>
            <h2 className='text-gray-500 text-2xl font-bold'>History is empty</h2>
        </div>

    const list = rh.historys.map((val, key) => {
        return (
            <div
                key={key}
                ref={(el) => { refs.current[key] = el; }}
                id={`history_${key}`}
                className="
                    flex flex-row gap-4 p-4
                "
                style={{ height: heights[key] ? `${heights[key]}px` : '0' }}
            >
                { RoleSwitch(val, calculateHeights, key) }
            </div>
        )
    })
    return (
        <div className=''>
            {list}
        </div>
    )
}

const RoleSwitch = (
    history: ResponseHistoryInterface['historys'][number],
    calculateHeights: (index?: number) => void,
    index: number
): JSX.Element => {
    switch (history.role) {
        case 'user':
            return UserContent(history, calculateHeights, index)
        case 'assistant':
            return AssistantContent(history, calculateHeights, index)
        default:
            return <div></div>
    }
}

const AssistantContent = (
    ct: ResponseHistoryInterface['historys'][number],
    calculateHeights: (index?: number) => void,
    index: number
): JSX.Element => {
    console.log('Assistant' ,ct);
    return (
        <div className="flex gap-x-2 sm:gap-x-4 mt-4 ml-6">
            <span className="
                shrink-0 inline-flex items-center justify-center
                size-[38px] rounded-full bg-purple-600 hover:bg-purple-700 cursor-pointer">
                <span className="
                    text-sm font-medium text-white leading-none"
                    onClick={() => ct.text && copyToClipboard(ct.text)}
                    >
                    Sys
                </span>
            </span>
            <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
                <div className="inline-block bg-gray-600 rounded-lg p-4 shadow-sm">
                    <div className="flex flex-wrap gap-2">
                        {ct.text && (
                            <pre className='text-sm text-white whitespace-pre-wrap'>
                                {ct.text.length > 30 
                                    ? ct.text.split(' ').reduce((acc, word) => {
                                        if ((acc.split('\n').pop() || '').length + word.length > 30) {
                                            return acc + '\n' + word + ' ';
                                        }
                                        return acc + word + ' ';
                                        }, '').trim()
                                    : ct.text
                                }
                            </pre>
                        )}
                        {ct.image && (
                            <img
                                key="image"
                                src={ct.image.image}
                                width={64}
                                height={64}
                                className="object-cover"
                                onLoad={() => calculateHeights(index)} />
                        )}
                        {ct.audio && (
                            <audio
                                key="audio"
                                controls
                                className="w-32 h-16"
                                onLoadedData={() => calculateHeights(index)}>
                                <source src={ct.audio.data} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        )}
                        {ct.file && (
                            <div key="file" className="w-16 h-16 bg-gray-500 flex items-center justify-center text-white text-xs">
                                📁 {ct.file.name}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

const UserContent = (
    history: ResponseHistoryInterface['historys'][number],
    calculateHeights: (index?: number) => void,
    index: number
): JSX.Element => {
    console.log(history);
    return (
        <div className="
        max-w-2xl ms-auto flex justify-end gap-x-2
        mt-4 sm:gap-x-4
    ">
        <div className="grow text-end">
            <div className="inline-block bg-gray-600 rounded-lg p-4 shadow-sm">
                <div className="flex flex-wrap gap-2" onClick={() => history.text && copyToClipboard(history.text)}>
                    {history.text && (
                        <pre className='text-sm text-white whitespace-pre-wrap'>
                            {history.text.length > 30
                                ? history.text.split(' ').reduce((acc, word) => {
                                    if ((acc.split('\n').pop() || '').length + word.length > 30) {
                                        return acc + '\n' + word + ' ';
                                    }
                                    return acc + word + ' ';
                                }, '').trim()
                                : history.text
                            }
                        </pre>
                    )}
                    {history.image && (
                        <img
                            src={history.image.image}
                            width={64}
                            height={64}
                            className="object-cover"
                            onLoad={() => calculateHeights(index)} />
                    )}
                    {history.audio && (
                        <audio
                            controls
                            className="w-32 h-16"
                            onLoadedData={() => calculateHeights(index)}>
                            <source src={history.audio.data} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    )}
                </div>
            </div>
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



export default ChatList