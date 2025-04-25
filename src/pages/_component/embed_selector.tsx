import React, { JSX } from 'react';
import { useDispatch } from 'react-redux';

type EmbedSelectorState = {
    model: string;
    next: string;
}

export const Embed_Selector = (state: EmbedSelectorState): JSX.Element => {
    const dispatch = useDispatch();    

    return (
            <>
                <div className='leading-10 mt-1'>
                    model : 
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
                                key     : 'model',
                                option  : e.target.value
                            })
                    }}>    
                        <option value='text-embedding-3-large'>text-embedding-3-large</option>
                        <option value='text-embedding-3-small'>text-embedding-3-small</option>
                        <option value='text-embedding-ada-002'>text-embedding-ada-002</option>
                    </select>
                </div>
            </>
    )
}

export default Embed_Selector
