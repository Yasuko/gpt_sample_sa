import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import reducer
import {
    EmbedFormPropsInterface,
    EmbedFormInterface,
    initialState
} from '../../_domain/embed/reducers/EmbedForm'

// import component
import Embed_Selector from '../_component/embed_selector'

export const Option = (): JSX.Element => {
    const dispatch = useDispatch()
    // コンテンツ表示Reducer呼び出し
    const ef = useSelector((state: EmbedFormPropsInterface): EmbedFormInterface => {
        return state.EmbedForm === undefined ? initialState : state.EmbedForm
    })

    return (
        <div className='whisper-option'>
            <div className='whisper-option-cell'>
                <Embed_Selector
                    model={ef.options.model}
                    next='EmbedForm/setOptions'
                />
            </div>
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    encoding_format:
                </div>
                <div className='whisper-option-content'>
                    <select
                        value={ef.options.encoding_format}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            dispatch({
                                type    : 'EmbedForm/setOptions',
                                key     : 'encoding_format',
                                option  : e.target.value
                            })
                        }}>
                        <option value='float'>float</option>
                        <option value='base64'>base64</option>
                    </select>
                </div>
            </div>

        </div>
    )
}



export default Option;
