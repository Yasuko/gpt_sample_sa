import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ResponseFormatType, JsonSchemaType } from '../../../_lib/gpt/_helper/chat.helper'
import {
    parseJson, isJson, stringifyJson
} from '../../../_lib/_helper/json.helper'

// import helper
import { duplicator } from '../../_helper/object.helper'

export interface ResponseFormatPropsInterface {
    ResponseFormat?: ResponseFormatInterface;
    dispatch?: any;
}

// 編集用のID付きのToolType
export type EditResponseFormat = 
    JsonSchemaType
    & {
        id: number
    }


export type ResponseFormatInterface = {
    schemas: JsonSchemaType[]
    type: 'text' | 'json_object' | 'json_schema'
    edit_schema: EditResponseFormat
    screen: boolean         // スクリーン表示
}

export const initialResponseFormat: EditResponseFormat = {
    ...{
        name: 'math_response',
        schema: {
            type: 'object',
            properties: {
                steps: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            explanation: {
                                type: 'string'
                            },
                            output: {
                                type: 'number'
                            }
                        },
                        required: [
                            'explanation',
                            'output'
                        ],
                        additionalProperties: false
                    },
                },
                final_answer: {
                    type: 'string'
                },
            },
            additionalProperties: false,
            required: [
                'steps',
                'final_answer'
            ]
        },
        strict: true
    },
    ...{
        id: 999
    }
}

export const initialState: ResponseFormatInterface = {
    schemas: [],
    type: 'text',
    edit_schema: initialResponseFormat,
    screen: false
}

const slice = createSlice({
    name: 'ResponseFormat',
    initialState,
    reducers: {
        set: (
            state: ResponseFormatInterface,
            action: PayloadAction<ResponseFormatInterface>
        ) => {
            return Object.assign({}, state, {
                ...action.payload
            })
        },
        setSchemas: (
            state: ResponseFormatInterface,
            action: PayloadAction<JsonSchemaType[]>
        ) => {
            return Object.assign({}, state, {
                schemas: action.payload
            })
        },
        addSchemas: (
            state: ResponseFormatInterface,
            action: PayloadAction<void>
        ) => {
            const edit = duplicator<ResponseFormatInterface['edit_schema']>(state.edit_schema)
            const schemas = duplicator<ResponseFormatInterface['schemas']>(state.schemas)
            if (edit.id !== 999) {
                schemas[edit.id] = edit
            } else {
                schemas.push(edit)
            }
            return Object.assign({}, state, {
                schemas
            })
        },
        update: (
            state: ResponseFormatInterface,
            action: PayloadAction<{
                id: number,
                schema: JsonSchemaType
            }>
        ) => {
            const schemas = state.schemas.map((schema, index) => {
                if (index === action.payload.id) {
                    return action.payload.schema
                }
                return schema
            })
            return Object.assign({}, state, {
                schemas: schemas
            })
        },
        remove: (
            state: ResponseFormatInterface,
            action: PayloadAction<number>
        ) => {
            const schemas = state.schemas.filter((schema, index) => {
                return index !== action.payload
            })
            return Object.assign({}, state, {
                schemas: schemas
            })
        },
        setEditor: (
            state: ResponseFormatInterface,
            action: PayloadAction<number>
        ) => {
            const schema = duplicator<ResponseFormatInterface['schemas']>(state.schemas)
            return Object.assign({}, state, {
                edit_schema: schema[action.payload]
            })
        },
        updateEditor: (
            state: ResponseFormatInterface,
            action: PayloadAction<string>
        ) => {
            return Object.assign({}, state, {
                edit_schemas: parseJson(action.payload)
            })
        },
        saveEditor: (
            state: ResponseFormatInterface,
            action: PayloadAction<string>
        ) => {
            const schemas = duplicator<ResponseFormatInterface['schemas']>(state.schemas)
            schemas.push(parseJson(action.payload))
            return Object.assign({}, state, {
                schemas
            })
        },
        resetEditor: (
            state: ResponseFormatInterface,
            action: PayloadAction<void>
        ) => {
            return Object.assign({}, state, {
                edit_schema: initialState.edit_schema
            })
        },
        reset: (
            state: ResponseFormatInterface,
            action: PayloadAction<void>
        ) => {
            return initialState
        }
    }
});

export default slice.reducer
