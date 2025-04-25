import React, { JSX } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import reducer
import {
    TokenFormPropsInterface,
    TokenFormInterface,
    initialState
} from '../../_domain/token/reducers/TokenForm'

// import Component

// import Hook

export const InputToken = (): JSX.Element => {
    const dispatch = useDispatch()
    const t = useSelector((state: TokenFormPropsInterface): TokenFormInterface => {
        return state.TokenForm === undefined ? initialState : state.TokenForm
    })
    return (
    <div className='w-svw h-sv-h'>
        <div className="flex flex-row justify-center items-center h-full mt-[15%]">

            <div className="flex w-2/3 rounded-lg">
                <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm dark:bg-neutral-700 dark:border-neutral-700">
                    <span className="text-sm text-gray-500 dark:text-neutral-400">Token</span>
                </span>
                <input
                    type="text"
                    id=""
                    name=""
                    className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-0 sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
                <button
                    type="button"
                    className="
                        w-20 size-11.5 shrink-0 inline-flex justify-center items-center
                        gap-x-2 text-sm font-semibold rounded-e-md
                        border border-transparent
                        bg-blue-600 text-white hover:bg-blue-700
                        focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    onClick={() => {
                        const token = document.querySelector('input') as HTMLInputElement
                        dispatch({
                            type    : 'TokenAction/setToken',
                            token   : token.value
                        })
                    }}>
                    Save Browser
                    
                </button>
            </div>
        </div>
        <span
            className='
                flex flex-row justify-center items-center
                w-[90svw] mt-20
                text-center text-xl text-gray-500 font-bold
            '>
            OpenAIAPIを呼び出すトークンを入力して下さい。<br></br>
            入力されたトークンはブラウザ内で保存され<br></br>
            外部に送信、保存される事はありません。
        </span>
    </div>

    )
}

export default InputToken