import React from 'react';
import { useDispatch } from 'react-redux';

type EmbedSelectorState = {
    model: string;
    next: string;
}

export const Embed_Selector = (state: EmbedSelectorState): JSX.Element => {
    const dispatch = useDispatch();    

    return (
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    model : 
                </div>
                <div className='whisper-option-content'>
                    <select
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
            </div>
    )
}

export default Embed_Selector
