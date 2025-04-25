import { JSX } from 'react'
import { useDispatch } from 'react-redux'

import {
    ResponseFormatInterface,
} from '../../../_domain/_all/reducers/ResponseFormat'

// import reducer


const ResponseFormList = ({
    schemas
}: {
    schemas: ResponseFormatInterface['schemas']
}): JSX.Element => {
    const dispatch = useDispatch()
    console.log(schemas)
    let list = [<div key={0} className='h-4 text-center col-span-8 gap-4'>none</div>]
    if (schemas.length > 0) {
        list = schemas.map((val, key) => {
            return (
                <div
                    key={key}
                    className='
                        col-span-6 relative float-left
                        h-10 p-0 m-0
                        grid grid-cols-6
                        text-lg text-gray-700 font-medium text-center
                        bg-gray-400
                        dark:text-white
                '>
                    <div
                        className="
                            col-span-6
                            h-8 m-1
                            rounded-lg
                            bg-gray-600
                            cursor-pointer
                            "
                        onClick={() => {
                            dispatch({
                                type: 'ResponseFormat/setEditor',
                                payload: key
                            })
                        }}>
                        {val.name}
                    </div>
                </div>
            )
        })
    }
    return (
        <div
            className='
                w-full max-h-[85vh] p-4
                grid grid-cols-6 gap-2
                bg-gray-700 bg-opacity-80
                rounded-lg
                overflow-y-auto overflow-x-hidden
            '>
            <div
                className="
                    col-span-6
                    block h-4 -mt-4 mb-1
                    text-lg text-gray-700 font-medium text-center
                    dark:text-white
                ">name</div>
            {list}
        </div>
    )
}


const splitDescription = (description: string | undefined): string => {
    if (description === undefined) return ''
    return description.length > 20 ? description.substring(0, 20) + '...' : description
}


export default ResponseFormList
