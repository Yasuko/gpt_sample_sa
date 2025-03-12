import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    TokenPropsInterface,
    TokenInterface,
    initialState
} from '../../_domain/_all/reducers/Token'


export const TokenCounter = (): JSX.Element => {
    const dispatch = useDispatch()

    const token = useSelector((state: TokenPropsInterface): TokenInterface => {
        return state.Token === undefined ? initialState : state.Token
    })

    return (
        <div
            className='
                absolute right-0 bottom-0 w-[150px] h-12
                bg-gray-500 bg-opacity-95
                text-sm text-gray-300
                rounded-lg

                hover:w-[450px] hover:h-56 transition-all
                hover:text-xl hover:bg-gray-700 hover:bg-opacity-95
                duration-300
            '>
            <div
                className='px-4 py-3 w-full h-full grid grid-cols-1 gap-2'
                >
                <div className="w-full grid grid-cols-5">
                    <span className='col-span-3'>Total:</span>
                    <span className="col-span-2">{token.result.total_tokens} </span>
                </div>

                <div
                    className="
                        w-full opacity-0
                        grid grid-cols-5
                        hover:opacity-100 transition-opacity duration-300
                        ">
                    <span className='col-span-3'>Completion:</span>
                    <span className="col-span-2"> {token.result.completion_tokens} </span>
                    <span className='col-span-3 text-sm'>Accepted Prediction:</span>
                    <span className="col-span-2 text-sm"> {token.result.completion_tokens_details.accepted_prediction_tokens} </span>
                    <span className='col-span-3 text-sm'>Audio:</span>
                    <span className="col-span-2 text-sm"> {token.result.completion_tokens_details.audio_tokens} </span>
                    <span className='col-span-3 text-sm'>Reasoning:</span>
                    <span className="col-span-2 text-sm"> {token.result.completion_tokens_details.reasoning_tokens} </span>
                    <span className='col-span-3'>Prompt:</span>
                    <span className="col-span-2"> {token.result.prompt_tokens} </span>
                    <span className='col-span-3 text-sm'>Audio:</span>
                    <span className="col-span-2 text-sm"> {token.result.prompt_tokens_details.audio_tokens} </span>
                    <span className='col-span-3 text-sm'>Cache:</span>
                    <span className="col-span-2 text-sm"> {token.result.prompt_tokens_details.cached_tokens} </span>
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}

export default TokenCounter
