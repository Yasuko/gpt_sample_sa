import React from 'react'
import { useDispatch } from 'react-redux'

type CheckBoxState = {
    list: {
        key: string,
        value: string
    }[]
    next: string;
}

export const CheckBox = (
    state: CheckBoxState
): JSX.Element => {
    const dispatch = useDispatch()

    return (
    <ul className="max-w-sm flex flex-col">
        {boxList(state.list, dispatch)}
    </ul>
    )
}

const boxList = (
    data: {
        key: string,
        value: string
    }[],
    dispatch: any
): JSX.Element[] => {
    return data.map((item) => {
        return (
            <li
                key={item.key}
                className="
                inline-flex items-center gap-x-2 py-1 px-2
                text-sm font-medium text-gray-800
                bg-neutral-800 border border-gray-100
                -mt-px first:rounded-t-lg first:mt-0
                last:rounded-b-lg
                dark:bg-neutral-800 dark:border-gray-700 dark:text-white
                ">
                <div className="relative flex items-start w-full">
                    <div className="flex items-center h-5">
                        <input
                        id="hs-list-group-item-checkbox-1"
                        name="hs-list-group-item-checkbox-1"
                        type="checkbox"
                        className="
                            border-gray-200 rounded disabled:opacity-50
                            dark:bg-neutral-800 dark:border-neutral-700
                            dark:checked:bg-blue-500 dark:checked:border-blue-500
                            dark:focus:ring-offset-gray-800"
                        checked={undefined} 
                        onChange={
                            (e) => {
                                dispatch({
                                    type: 'ChatForm/setOptions',
                                    key: item.key,
                                    option: e.target.checked
                                })
                            }
                        } />
                    </div>
                    <label
                        htmlFor={item.key}
                        className="
                            ms-3.5 block w-full text-sm text-gray-300 dark:text-neutral-300
                            ">
                        {item.value}
                    </label>
                </div>
            </li>
        )
    })
}


export default CheckBox
