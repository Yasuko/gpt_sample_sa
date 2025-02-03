import React from 'react'

import { Link } from 'react-router-dom'

const Header = (): JSX.Element => {
    return (
        <header
            className="
                flex flex-wrap
                sm:justify-start sm:flex-nowrap
                w-full bg-gray-900 text-sm py-3
                dark:bg-neutral-800
            ">
            <nav
                className="
                    max-w-[85rem] w-full mx-auto px-4
                    flex flex-wrap basis-full items-center justify-between">
                <div
                    id="hs-navbar-alignment"
                    className="
                        w-full hs-collapse hidden overflow-hidden
                        transition-all duration-300 basis-full
                        grow sm:grow-0 sm:basis-auto sm:block sm:order-2"
                    aria-labelledby="hs-navbar-alignment-collapse">
                    <div
                        className="
                            flex justify-center gap-5 relative mt-3 m-auto

                            sm:flex-row sm:items-center sm:mt-0">
                        <Link
                            to="/Realtime"
                            className="
                                font-medium text-gray-600 hover:text-gray-400
                                focus:outline-none focus:text-gray-400
                                dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500
                            ">
                            Realtime
                        </Link>
                        <Link
                            to="/Whisper"
                            className="
                                font-medium text-gray-600 hover:text-gray-400
                                focus:outline-none focus:text-gray-400
                                dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500
                            ">
                            Whisper
                        </Link>
                        <Link
                            to="/Speech"
                            className="
                                font-medium text-gray-600 hover:text-gray-400
                                focus:outline-none focus:text-gray-400
                                dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500
                            ">
                            Speech
                        </Link>
                        <Link
                            to="/Chat"
                            className="
                                font-medium text-gray-600 hover:text-gray-400
                                focus:outline-none focus:text-gray-400
                                dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500
                            ">
                            Chat
                        </Link>
                        {/*
                        <Link
                            to="/ChatAdvance"
                            className="
                                font-medium text-gray-600 hover:text-gray-400
                                focus:outline-none focus:text-gray-400
                                dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500
                            ">
                            ChatAdvance
                        </Link>
                        */}
                        <Link
                            to="/Embed"
                            className="
                                font-medium text-gray-600 hover:text-gray-400
                                focus:outline-none focus:text-gray-400
                                dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500
                            ">
                            Embed
                        </Link>
                        <Link
                            to="/Vision"
                            className="
                                font-medium text-gray-600 hover:text-gray-400
                                focus:outline-none focus:text-gray-400
                                dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500
                            ">
                            Vision
                        </Link>
                        <Link
                            to="/Image"
                            className="
                                font-medium text-gray-600 hover:text-gray-400
                                focus:outline-none focus:text-gray-400
                                dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500
                            ">
                            Image
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
