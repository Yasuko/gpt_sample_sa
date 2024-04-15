import React from 'react'
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
        <div className='whisper-show-text'>
            <div className='whisper-show-text-content'>
                <div className='whisper-title'>
                    Text : 
                    <br></br>
                    <div>
                        {
                            //st.textType 
                        }
                    </div>
                    <br></br>
                    <button
                        className='btn btn-sm btn-info'
                        id='whisper-text-download'>
                        DL
                    </button>
                </div>
                <div className='whisper-text'>
                    <pre id='whisper-showText-text'>
                        { st.text }
                    </pre>
                </div>
            </div>
            <div className='whisper-show-text-content'>
                <div className='whisper-title'>
                    Formation : 
                    <br></br>
                    <div
                        className='btn btn-sm btn-secondary'
                        onClick={() => {
                            dispatch({
                                type    : 'WhisperAction/convertText',
                                key     : st.key,
                                job     : 'formation'
                            })
                        }}>
                        DO
                    </div>
                </div>
                <div className='whisper-text'>
                    { st.formation }
                </div>
            </div>
            <div className='whisper-show-text-content'>
                <div className='whisper-title'>
                    Summary : 
                    <br></br>
                    <div
                        className='btn btn-sm btn-secondary'
                        onClick={() => {
                            dispatch({
                                type    : 'WhisperAction/convertText',
                                key     : st.key,
                                job     : 'summary'
                            })
                        }}>
                        DO
                    </div>
                </div>
                <div className='whisper-text'>
                    <pre>{ st.summary }</pre>
                </div>
            </div>
            <div
                className='btn btn-xl btn-primary whisper-show-text-button'
                onClick={() => {
                dispatch({
                    type    : 'WhisperScreen/toggleShowText',
                })
            }}>
                Close
            </div>
        </div>
    )
};

export default ShowText;
