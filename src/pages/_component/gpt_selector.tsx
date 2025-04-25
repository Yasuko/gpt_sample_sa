import React, { JSX } from 'react'
import { useDispatch } from 'react-redux'

type GPTSelectorState = {
    model: string;
    next: string;
}

export const GPT_Selector = (state: GPTSelectorState): JSX.Element => {
    const dispatch = useDispatch()

    return (
        <>
            <div className='leading-10 mt-1'>
                model [ {state.model} ] :
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
                    dark:focus:ring-neutral-600'
                value={state.model}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    dispatch({
                        type    : state.next,
                        payload: {
                            key     : 'model',
                            option  : e.target.value
                        }
                    })
                }}>
                    <option value='o4-mini'>o4 mini</option>
                    <option value='o3-mini'>o3 mini</option>
                    <option value='o1-mini'>o1 mini</option>
                    <option value='gpt-4.1'>gpt 4.1</option>
                    <option value='gpt-4.1-mini'>gpt 4.1 mini</option>
                </select>
            </div>
        </>
    )
}

export default GPT_Selector
