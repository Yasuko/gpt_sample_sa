import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import reducer
import {
    VisionFormPropsInterface,
    VisionFormInterface,
    initialState
} from '../../_domain/vision/reducers/VisionForm'

// import component


export const Option = (): JSX.Element => {
    const dispatch = useDispatch()
    // コンテンツ表示Reducer呼び出し
    const cf = useSelector((state: VisionFormPropsInterface): VisionFormInterface => {
        return state.VisionForm === undefined ? initialState : state.VisionForm
    })

    return (
        <div className='whisper-option'>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    temperature [{cf.temperature}]:
                </div>
                <div className='whisper-option-content'>
                    <input
                        type='range'
                        defaultValue={cf.temperature}
                        min={0.0}
                        max={2.0}
                        step={0.1}
                        onChange={(e) => {
                            dispatch({
                                type        : 'VisionForm/setTemperature',
                                temperature : Number(e.target.value)
                            })
                    }} />
                </div>
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    max_tokens [{cf.max_tokens}]: 
                </div>
                <div className='whisper-option-content'>
                    <input
                        type='range'
                        min={1}
                        max={3000}
                        step={1}
                        defaultValue={cf.max_tokens}
                        onChange={(e) => {
                            dispatch({
                                type        : 'VisionForm/setMaxTokens',
                                max_tokens  : Number(e.target.value)
                            })
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Option
