import React, { JSX, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import helper

// import reducer
import {
    ResponseFormPropsInterface,
    ResponseFormInterface,
    initialState
} from '../../_domain/response/reducers/ResponseForm'

// import component
import Option from './Option'
import ChatList from './ChatList'
import ChatScreen from './ChatScreen'

export const Chat = (): JSX.Element => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        dispatch({
            type: 'TokenAction/checkToken',
            payload: { redirect: '/Chat' }
        })
    })

    const onClickOpen = () => {
        setOpen(true);
    }
    
    const onClickClose = () => {
        setOpen(false);
    }
    const cf = useSelector((state: ResponseFormPropsInterface): ResponseFormInterface => {
        return state.ResponseForm === undefined ? initialState : state.ResponseForm
    })
    return (
        <div className='
        flex flex-col lg:flex-row lg:flex-wrap
        w-svw max-h-[80vh] 
        '>
            <div
                className="
                    lg:flex-1
                    hidden lg:flex items-center h-full px-2
                    transition duration-150 ease-in-out
                ">
                <div className='
                    grid grid-cols-1 w-[30%] fixed
                    mt-[750px]
                '>
                    <h1 className="
                        text-4xl text-left
                        text-gray-600
                        ">Response</h1>
                    <Option />
                </div>
            </div>
            <div className="lg:hidden flex items-center h-14 w-full justify-between">
                { /* ハンバーガーボタン */ }
                <div className="flex px-3">
                { !open &&
                    <svg
                        onClick={onClickOpen}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 cursor-pointer"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        role="img"
                        viewBox="0 0 448 512">
                        <path
                            fill="currentColor"
                            d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                        ></path>
                    </svg>
                }
                { open &&
                    <svg
                        onClick={onClickClose}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 cursor-pointer"
                        viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414L10 8.586z" clipRule="evenodd" />
                    </svg>
                }
                { open && 
                    <div
                        className="
                            lg:hidden
                            absolute top-20 w-full
                            bg-gray-800 left-1/2 transform -translate-x-1/2
                        ">
                        <Option />
                    </div>}
                </div>
            </div>
            <div 
                className="flex-2 p-8 h-full">

                <div className='
                    overflow-y-auto overflow-x-hidden
                    '>
                    <ChatList />
                </div>
                <ChatScreen />
            </div>
            
        </div>
    )
}


export default Chat
