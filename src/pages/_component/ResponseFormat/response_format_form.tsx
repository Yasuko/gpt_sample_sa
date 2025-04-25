import { JSX } from 'react'
import { useDispatch } from 'react-redux'


// import reducer
import {
    ResponseFormatInterface
} from '../../../_domain/_all/reducers/ResponseFormat'

// import component
import ResponseFormatProperties from './response_format_properties'

const ResposenFormatForm = ({
    schemas,
}: {
    schemas: ResponseFormatInterface,
}): JSX.Element => {
    const dispatch = useDispatch()

    return (
        <div className='col-span-2'>
            <div className='grid grid-cols-5 gap-4'>
                <label
                    htmlFor="hs-firstname-hire-us-2"
                    className="
                        leading-10 mt-1
                        block mb-2
                        text-center text-sm text-gray-700 font-medium dark:text-white
                        ">Type</label>
                <select
                    className='
                        py-3 px-4 pe-9 block w-full
                        rounded-lg
                        text-sm
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600'
                    defaultValue={schemas.type}
                    onChange={(e) => {
                        dispatch({
                            type    : 'ResponseFormat/set',
                            payload : {
                                type: e.target.value
                            }
                        })
                    }}>
                    <option value='text'>text</option>
                    <option value='json_object'>json object</option>
                    <option value='json_schema'>json schema</option>
                </select>

                <ResponseFormatProperties
                    schema={schemas.edit_schema}
                    show={(schemas.type === 'json_schema')}
                />

            </div>
        </div>
    )
}

export default ResposenFormatForm
