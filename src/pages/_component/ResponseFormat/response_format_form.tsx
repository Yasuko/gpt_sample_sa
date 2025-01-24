import React from 'react'
import { useDispatch } from 'react-redux'


// import reducer
import {
    EditToolType,
} from '../../../_domain/_all/reducers/Tools'

// import component
import ToolEditorProperties from './response_format_properties'

const ToolEditorForm = ({
    tool,
    parameters,
    properties,
}: {
    tool: EditToolType,
    parameters: EditToolType['parameters'],
    properties: EditToolType['parameters']['properties'],
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
                    defaultValue={'text'}
                    onChange={(e) => {
                        dispatch({
                            type    : 'WhisperForm/updateOption',
                            key     : 'output_format',
                            option  : e.target.value
                        })
                    }}>
                    <option value='text'>text</option>
                    <option value='json_object'>json object</option>
                    <option value='json_schema'>json schema</option>
                </select>

                <ToolEditorProperties properties={properties} parameters={parameters} />

            </div>
        </div>
    )
}

export default ToolEditorForm
