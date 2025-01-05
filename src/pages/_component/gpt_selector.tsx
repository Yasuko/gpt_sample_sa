import React from 'react'
import { useDispatch } from 'react-redux'

type GPTSelectorState = {
    model: string;
    next: string;
}

export const GPT_Selector = (state: GPTSelectorState): JSX.Element => {
    const dispatch = useDispatch()

    return (
        <>
            <div className='m-2'>
                model : 
            </div>
            <div className='m-2'>
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
                        key     : 'model',
                        option  : e.target.value
                    })
                }}>
                    <option value='gpt-4o-mini'>gpt-4o mini</option>
                    <option value='gpt-4o'>gpt-4o</option>
                    <option value='gpt-4o-latest'>gpt-4o-latest</option>
                    <option value='o1-preview'>o1-preview</option>
                    <option value='o1-mini'>o1-mini</option>
                    <option value='gpt-4-turbo'>gpt-4-turbo</option>
                    <option value='gpt-3.5-turbo'>gpt-3.5-turbo</option>
                </select>
            </div>
        </>
    )
}

export default GPT_Selector
