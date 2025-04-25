import { JSX } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import reducer
import {
    WhisperScreenInterface,
    WhisperScreenPropsInterface,
    initialState,
} from '../../_domain/whisper/reducers/WhisperScreen'
import {
    WhisperShowTextPropsInterface,
    WhisperShowTextInterface,
    initialState as initialTextState,
} from '../../_domain/whisper/reducers/WhisperShowText'
// import Hook


export const ShowText = (state: any): JSX.Element => {
    const dispatch = useDispatch();    
    // コンテンツ表示Reducer呼び出し
    const ws = useSelector((state: WhisperScreenPropsInterface): WhisperScreenInterface => {
        return state.WhisperScreen === undefined ? initialState : state.WhisperScreen
    })
    // テキスト表示Reducer呼び出し
    const st = useSelector((state: WhisperShowTextPropsInterface): WhisperShowTextInterface => {
        return state.WhisperShowText === undefined ? initialTextState : state.WhisperShowText
    })

    if (ws.showText === false) return <div></div>

    return (
        <div className='
            absolute
            top-0 left-0 w-svw h-svh
            bg-gray-700 bg-opacity-50
            '>
            <div
                className='
                    grid grid-cols-5 gap4
                    w-4/5 h-[25%]
                    bg-gray-800
                    p-3 m-auto mt-4
                    rounded-lg
                '>
                <div className='col-span-1'>
                    <p
                        className='
                            ml-16 mb-2 mt-2
                            text-xl text-gray-500
                    '>Text</p>
                    <div>
                        {
                            //st.textType 
                        }
                    </div>
                    <button
                        className='
                            ml-12 mt-4 py-3 px-4 inline-flex items-center gap-x-2
                            text-sm font-medium text-gray-200
                            rounded-lg 
                            bg-blue-800 
                            hover:bg-blue-900 focus:outline-none focus:bg-blue-900
                            disabled:opacity-50 disabled:pointer-events-none
                        '
                        id='whisper-text-download'>
                        DL
                    </button>
                </div>
                <div className='col-span-4'>
                    <pre
                        id='whisper-showText-text'
                        className='
                            w-full h-full
                            bg-gray-900
                            overflow-y-auto overflow-x-hidden
                        '>
                        { st.text }
                    </pre>
                </div>
            </div>
            <div className='
                    grid grid-cols-5 gap4
                    w-4/5 h-[25%]
                    bg-gray-800
                    p-3 m-auto mt-4
                    rounded-lg
            '>
                <div className='col-span-1'>
                    <p
                        className='
                            ml-10 mb-2 mt-2
                            text-xl text-gray-500
                    '>Formation</p>
                    <button
                        className='
                            ml-8 mt-4 py-3 px-4 inline-flex items-center gap-x-2
                            text-sm font-medium text-gray-200
                            rounded-lg 
                            bg-blue-800 
                            hover:bg-blue-900 focus:outline-none focus:bg-blue-900
                            disabled:opacity-50 disabled:pointer-events-none
                        '
                        onClick={() => {
                            dispatch({
                                type    : 'WhisperAction/convertText',
                                key     : st.key,
                                job     : 'formation'
                            })
                        }}>
                        Generate
                    </button>
                </div>
                <div className='col-span-4'>
                    <pre
                        id='whisper-showText-formation'
                        className='
                            w-full h-full
                            bg-gray-900
                            overflow-y-auto overflow-x-hidden
                        '>
                        { st.formation }
                    </pre>
                </div>
            </div>
            <div className='
                    grid grid-cols-5 gap4
                    w-4/5 h-[25%]
                    bg-gray-800
                    p-3 m-auto mt-4
                    rounded-lg
            '>
                <div className='col-span-1'>
                    <p
                        className='
                            ml-10 mb-2 mt-2
                            text-xl text-gray-500
                    '>Summary</p>
                    <button
                        className='
                            ml-8 mt-4 py-3 px-4 inline-flex items-center gap-x-2
                            text-sm font-medium text-gray-200
                            rounded-lg 
                            bg-blue-800 
                            hover:bg-blue-900 focus:outline-none focus:bg-blue-900
                            disabled:opacity-50 disabled:pointer-events
                        '
                        onClick={() => {
                            dispatch({
                                type    : 'WhisperAction/convertText',
                                key     : st.key,
                                job     : 'summary'
                            })
                        }}>
                        Generate
                    </button>
                </div>
                <div className='col-span-4'>
                    <pre
                        className='
                            w-full h-full
                            bg-gray-900
                            overflow-y-auto overflow-x-hidden
                        '>
                        { st.summary }
                    </pre>
                </div>
            </div>
            <button
                className='
                    absolute top-[1%] right-[2%]
                    ml-8 mt-4 py-3 px-4 inline-flex items-center gap-x-2
                    text-sm font-medium text-gray-200
                    rounded-lg 
                    bg-blue-800 
                    hover:bg-blue-900 focus:outline-none focus:bg-blue-900
                    disabled:opacity-50 disabled:pointer-events-none
                '
                onClick={() => {
                dispatch({
                    type    : 'WhisperScreen/toggleShowText',
                })
            }}>
                Close
            </button>
        </div>
    )
};

export default ShowText;
