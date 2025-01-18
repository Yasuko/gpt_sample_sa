import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialToolType, ToolType } from '../../../_lib/gpt/_helper/chat.helper'

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
}

export const initialToole: EditToolType = 
{
    ...initialToolType,
    ...{
        id: 0
    }
}

export const initialState: ToolsInterface = {
    tools: [],
    editor: initialToole,
};

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
            action: PayloadAction<ToolType>
        ) => {
            return Object.assign({}, state, {
                tools: [...state.tools, action.payload]
            })
        },
        update: (
            state: ToolsInterface,
            action: PayloadAction<{
                id: number,
                tool: Partial<ToolType>
            }>
        ) => {
            const tools = state.tools.map((tool, index) => {
                if (index === action.payload.id) {
                    return Object.assign({}, tool, action.payload)
                }
                return tool
            })
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
            action: PayloadAction<EditToolType>
        ) => {
            return Object.assign({}, state, {
                editor: action.payload
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
            const edit = Object.assign({}, state.editor, {
                    properties: {
                        ...state.editor.parameters.properties,
                        [action.payload.properties.key]: {
                            type: action.payload.properties.type,
                            description: action.payload.properties.description
                        }
                    }
                })

            return Object.assign({}, state, {
                editor: edit
            })
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer
