import React, { Dispatch, JSX, useRef } from 'react'

// import helper

// import reducer
import { UserMessageType } from '../../_lib/gpt/_helper/chat.helper'
import { useAppDispatch, useAppSelector } from '@/_store/configureStore'
import {
    ResponseFormInterface,
} from '../../_domain/response/reducers/ResponseForm'

// import component

export const ChatScreen = () => {
    const dispatch = useAppDispatch()
    const [overlayH, setOverlayH] = React.useState(0)
    const rootRef = useRef<HTMLDivElement>(null)
    const rf = useAppSelector<ResponseFormInterface>(state => state.ResponseForm)
    

    React.useEffect(() => {
        const el = rootRef.current
        if (!el) return
        const parent = el.parentElement
        if (!parent) return
        const ro = new ResizeObserver(() => {
            const parentWidth = parent.getBoundingClientRect().width * 0.92
            el.style.width = `${parentWidth}px`
        })
        ro.observe(parent)
        return () => ro.disconnect()
    }, [])

    return (
        <div
            ref={rootRef}
            className="flex flex-col absolute bottom-[5%] py-4 bg-white dark:bg-gray-800  border-gray-200 dark:border-gray-700">
            {/* 相対コンテナでオーバーレイの基準にする（textarea と上端を合わせる） */}
            <div className="flex-3 m-4 mb-1">
                {/* オーバーレイのコンテンツ一覧（上端に揃える） */}
                <UserContentList rc={rf} onHeightChange={setOverlayH} />

                <textarea
                cols={70}
                rows={4}
                className="
                    w-full rounded p-4
                    bg-gray-200
                    text-gray-500
                "
                id="text1"
                placeholder="Input Sample"
                style={{ paddingTop: overlayH || undefined }}
                defaultValue={ rf.text }
                onChange={(e) => {
                    dispatch({
                        type     : 'ResponseForm/add',
                        payload  : {
                            text: e.target.value
                        }
                    })
                }}
                onDragOver={(e) => onDragStart(e, dispatch)}
                onDrop={(e) => onDragEnd(e, dispatch)}
                />
            </div>
            <div className="flex justify-top">
                <button
                    className='
                    ml-4 mr-4 py-2 px-4 inline-flex items-center gap-x-2
                    text-sm font-medium text-white
                    rounded-lg border border-transparent
                    bg-blue-600 
                    hover:bg-blue-700 focus:outline-none focus:bg-blue-700
                    disabled:opacity-50 disabled:pointer-events-none
                    '
                    onClick={() => {
                        dispatch({
                            type: 'ResponseAction/send'
                        })
                        clear()
                    }}>
                    Send
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
                        dispatch({
                            type: 'ResponseForm/reset'
                        })
                        clear()
                    }}>
                    Clear
                </button>
            </div>
        </div>
    )
}



const UserContentList = ({
    rc,
    onHeightChange,
}: {
    rc: ResponseFormInterface,
    onHeightChange?: (h: number) => void,
}): JSX.Element => {
    const dispatch = useAppDispatch()
    const wrapRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
        const el = wrapRef.current
        if (!el) return
        const notify = () => onHeightChange?.(el.getBoundingClientRect().height)
        notify()
        const ro = new ResizeObserver(() => notify())
        ro.observe(el)
        return () => ro.disconnect()
    }, [rc, onHeightChange])

    const removeAt = (idx: number, type: 'image' | 'file' | 'audio') => {
        const next = rc[type].filter((_, i: number) => i !== idx)
        console.log('ResponseForm/remove'+type.charAt(0).toUpperCase() + type.slice(1))
        dispatch({
            type: 'ResponseForm/remove'+type.charAt(0).toUpperCase() + type.slice(1),
            payload: { content: next, id: 0 }
        })
    }

    const i = rc.image.map(
        (val, key) => {
            return (
                <div key={key} className="relative bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-sm pointer-events-auto">
                    <button
                        aria-label="Remove"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gray-700 text-white hover:bg-red-600 flex items-center justify-center text-xs"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeAt(key, 'image') }}
                    >
                        ×
                    </button>
                    <img src={val.image} className="h-16 w-16 object-cover rounded" />
                </div>
                )
            })
    const a = rc.audio.map(
        (val, key) => {
            return (
                <div key={key} className="relative bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-sm pointer-events-auto">
                    <button
                        aria-label="Remove"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gray-700 text-white hover:bg-red-600 flex items-center justify-center text-xs"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeAt(key, 'audio') }}
                    >
                        ×
                    </button>
                    <audio controls className="w-40">
                        <source src={val.data} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
                )
            })
    const f = rc.file.map(
        (val, key) => {
            return (
                <div key={key} className="relative bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-sm pointer-events-auto">
                    <button
                        aria-label="Remove"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gray-700 text-white hover:bg-red-600 flex items-center justify-center text-xs"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeAt(key, 'file') }}
                    >
                        ×
                    </button>
                    <div className="w-40">
                        <span className="text-sm text-gray-700 dark:text-gray-300 break-all">{val.name}</span>
                    </div>
                </div>
                )
            })
    return (
        <div className='absolute top-0 left-0 right-0 z-10 w-full pointer-events-none'>
            <div ref={wrapRef} className="flex flex-wrap gap-3">
                { i }
                { a }
                { f }
            </div>
        </div>
    )
}

const clear = () => {
    const t = document.getElementById('text1') as HTMLTextAreaElement
    t.value = ''
}


const onDragStart = (
    e: React.DragEvent | DragEvent,
    dispatch: any
): void => {
    e.preventDefault();
    dispatch({
        type    : 'ResponseAction/dragStart',
        event   : e,
    })
}

const onDragEnd = (
    e: React.DragEvent | DragEvent,
    dispatch: any
): void => {
    e.preventDefault()
    
    dispatch({
        type    : 'ResponseAction/dragEnd',
        event   : e,
    })
    e.stopPropagation()
}


export default ChatScreen