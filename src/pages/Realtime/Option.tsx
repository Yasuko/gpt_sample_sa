import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import reducer
import {
    RealtimeFormPropsInterface,
    RealtimeFormInterface,
    initialState
} from '../../_domain/realtime/reducers/RealtimeForm'

// import component
import CheckBox from '../_component/checkbox'

export const Option = (): JSX.Element => {
    const dispatch = useDispatch()
    // コンテンツ表示Reducer呼び出し
    const cf = useSelector((state: RealtimeFormPropsInterface): RealtimeFormInterface => {
        return state.RealtimeForm === undefined ? initialState : state.RealtimeForm
    })

    return (
        <div className='whisper-option'>
            <div className='whisper-option-cell'>
                {cf.SessionOptions.model}
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    temperature [{cf.SessionOptions.temperature}]:
                </div>
                <div className='whisper-option-content'>
                    <input
                        type='range'
                        defaultValue={cf.SessionOptions.temperature}
                        min={0.6}
                        max={1.2}
                        step={0.1}
                        onChange={(e) => {
                            dispatch({
                                type    : 'ChatForm/setOptions',
                                key     : 'temperature',
                                option  : Number(e.target.value)
                            })
                    }} />
                </div>
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    modalities [{cf.SessionOptions.modalities}]:
                </div>
                <div className='whisper-option-content'>
                    <CheckBox list={[{key: 'text', value: 'text'}, {key: 'audio', value: 'audio'}]} next={'aaa'}/>
                </div>
            </div>
        </div>
    )
}

export default Option
