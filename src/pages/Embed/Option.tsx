import React, { JSX } from 'react'
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
        <div
            className='
                grid grid-cols-2 w-full
                p-4
                overflow-y-auto overflow-x-hidden
        '>
            <Embed_Selector
                model={ef.options.model}
                next='EmbedForm/setOptions'
            />

            <div className='leading-10 mt-1'>
                encoding_format:
            </div>
            <div className=''>
                <select
                    className='
                        py-3 px-4 pe-9 block w-full
                        border-gray-200 rounded-lg
                        text-sm
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    '
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
    )
}



export default Option;
