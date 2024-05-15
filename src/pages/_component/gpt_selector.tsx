import React from 'react';
import { useDispatch } from 'react-redux';

type GPTSelectorState = {
    model: string;
    next: string;
}

export const GPT_Selector = (state: GPTSelectorState): JSX.Element => {
    const dispatch = useDispatch();    

    return (
            <div className='whisper-option-cell'>
                <div className='whisper-option-title'>
                    model : 
                </div>
                <div className='whisper-option-content'>
                    <select
                    value={state.model}
                    onChange={(e) => {
                        dispatch({
                            type    : state.next,
                            key     : 'model',
                            option  : e.target.value
                        })
                    }}>
                        <option value='gpt-4o'>gpt-4o</option>
                        <option value='gpt-4-turbo'>gpt-4-turbo</option>
                        <option value='gpt-4-turbo-2024-04-09'>gpt-4-turbo-2024-04-09</option>
                        <option value='gpt-3.5-turbo-0125'>gpt-3.5-turbo-0125</option>
                        <option value='gpt-3.5-turbo'>gpt-3.5-turbo</option>
                    </select>
                </div>
            </div>
    )
}

export default GPT_Selector
