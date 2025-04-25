import { JSX } from 'react'
import { useDispatch } from 'react-redux'


// import reducer
import {
    EditToolType,
} from '../../../_domain/_all/reducers/Tools'

// import component
import ToolEditorProperties from './tool_editor_properties'

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
                        ">name</label>
                <input
                    type="text"
                    name="hs-firstname-hire-us-2"
                    id="hs-firstname-hire-us-2"
                    className="
                        col-span-4
                        py-3 px-4 block w-full
                        border-gray-200 rounded-lg
                        text-sm focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-gray-600 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    "
                    value={tool?.name}
                    onChange={ (e) => {
                        dispatch({
                            type: 'Tools/updateEditor',
                            payload: {
                                id: tool.id,
                                name: e.target.value
                            }
                        })
                    }} />

                <label
                    htmlFor="hs-lastname-hire-us-2"
                    className="
                        leading-10 mt-1
                        block mb-2
                        text-center text-sm text-gray-700 font-medium
                        dark:text-white
                    ">description</label>
                <input
                    type="text"
                    name="hs-lastname-hire-us-2"
                    id="hs-lastname-hire-us-2"
                    className="
                        col-span-4
                        py-3 px-4 block w-full
                        border-gray-200 rounded-lg
                        text-sm focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-gray-600 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                    "
                    value={tool?.description}
                    onChange={(e) => {
                        dispatch({
                            type: 'Tools/updateEditor',
                            payload: {
                                id: tool.id,
                                description: e.target.value
                            }
                        })
                    }} />

                <ToolEditorProperties properties={properties} parameters={parameters} />

                <label
                    htmlFor="hs-lastname-hire-us-2"
                    className="
                        leading-10 mt-1
                        block mb-2
                        text-center text-sm text-gray-700 font-medium
                        dark:text-white
                    ">strict</label>
                <input
                    name="hs-lastname-hire-us-2"
                    id="hs-lastname-hire-us-2"
                    className='
                        col-span-4
                        w-full mt-4 py-3 px-4 pe-9 block
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:placeholder-neutral-500
                        dark:focus:ring-neutral-600
                        '
                    type='checkbox'
                    checked={(!tool?.strict) ? false : tool?.strict}
                    onChange={(e) => {
                        dispatch({
                            type: 'Tools/updateEditor',
                            payload: {
                                id: tool.id,
                                strict: e.target.checked
                            }
                        })
                    }}
                />
            </div>
        </div>
    )
}

export default ToolEditorForm
