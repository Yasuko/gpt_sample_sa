import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialToolType, ToolType } from '../../../_lib/gpt/_helper/chat.helper'

// import helper
import { duplicator } from '../../_helper/object.helper'

export interface ToolsPropsInterface {
    Tools?: ToolsInterface;
    dispatch?: any;
}

export type EditToolType = 
    ToolType['function']
    & {
        id: number
    }

export type ToolsInterface = {
    tools: ToolType[]
    editor: EditToolType
    edit_properties: EditToolType['parameters']['properties']
    screen: boolean
}

export const initialToole: EditToolType = {
    ...initialToolType,
    ...{
        id: 0
    }
}

export const initialState: ToolsInterface = {
    tools: [],
    editor: initialToole,
    edit_properties: initialToole.parameters.properties,
    screen: false
}

const slice = createSlice({
    name: 'Tools',
    initialState,
    reducers: {
        set: (
            state: ToolsInterface,
            action: PayloadAction<ToolsInterface>
        ) => {
            return Object.assign({}, state, {
                ...action.payload
            })
        },
        add: (
            state: ToolsInterface,
            action: PayloadAction<void>
        ) => {
            const edit: ToolType = {
                type: 'function',
                function: duplicator<ToolsInterface['editor']>(state.editor)
            }

            edit.function.parameters.properties
                = duplicator<ToolsInterface['edit_properties']>(state.edit_properties)

            return Object.assign({}, state, {
                tools: [...state.tools, edit],
                editor: initialToole,
                edit_properties: initialToole.parameters.properties
            })
        },
        update: (
            state: ToolsInterface,
            action: PayloadAction<{
                id: number,
            }>
        ) => {
            const edit: ToolType = {
                type: 'function',
                function: duplicator<ToolsInterface['editor']>(state.editor)
            }
            edit.function.parameters.properties
                = duplicator<ToolsInterface['edit_properties']>(state.edit_properties)

            const tools = duplicator<ToolType[]>(state.tools)
            tools[action.payload.id] = edit

            return Object.assign({}, state, {
                tools
            })
        },
        remove: (
            state: ToolsInterface,
            action: PayloadAction<number>
        ) => {
            const tools = state.tools.filter((tool, index) => {
                return index !== action.payload
            })
            return Object.assign({}, state, {
                tools
            })
        },
        setEditor: (
            state: ToolsInterface,
            action: PayloadAction<number>
        ) => {
            const tools = duplicator<ToolsInterface['tools']>(state.tools)
            return Object.assign({}, state, {
                editor: tools[action.payload].function,
                edit_properties: tools[action.payload].function.parameters.properties
            })
        },
        updateEditor: (
            state: ToolsInterface,
            action: PayloadAction<Partial<EditToolType>>
        ) => {
            const edit = Object.assign({}, state.editor, action.payload)
            return Object.assign({}, state, {
                editor: edit
            })
        },
        addProperties: (
            state: ToolsInterface,
            action: PayloadAction<{
                id: number,
                properties: {
                    key: string,
                    type: string,
                    description: string
                }
            }>
        ) => {
            console.log('addProperties', action.payload)
            const edit = Object.assign({},
                state.edit_properties, 
                {
                    [action.payload.properties.key]: {
                        type: action.payload.properties.type,
                        description: action.payload.properties.description
                    }
                }
            )

            return Object.assign({}, state, {
                edit_properties: edit
            })
        },
        updateProperties: (
            state: ToolsInterface,
            action: PayloadAction<{
                id: number,
                properties: {
                    key: string,
                    type: string,
                    description: string
                }
            }>
        ) => {
            const edit = Object.assign({},
                state.edit_properties,
                {
                    ...state.edit_properties,
                    [action.payload.properties.key]: {
                        type: action.payload.properties.type,
                        description: action.payload.properties.description
                    }
                }
            )

            return Object.assign({}, state, {
                edit_properties: edit
            })
        },
        removeProperties: (
            state: ToolsInterface,
            action: PayloadAction<{
                id: number,
            }>
        ) => {
            const edit = Object.assign({}, state.edit_properties, 
                Object.keys(state.edit_properties).reduce((acc, key) => {
                    if (key !== action.payload.id.toString()) {
                        acc[key] = state.edit_properties[key]
                    }
                    return acc
                }, {})
            )

            return Object.assign({}, state, {
                edit_properties: edit
            })
        },
        resetEditor: (
            state: ToolsInterface,
            action: PayloadAction<void>
        ) => {
            return Object.assign({}, state, {
                editor: initialToole,
                edit_properties: initialToole.parameters.properties
            })
        },
        reset: (
            state: ToolsInterface,
            action: PayloadAction<void>
        ) => {
            return initialState
        }
    }
});

export default slice.reducer
