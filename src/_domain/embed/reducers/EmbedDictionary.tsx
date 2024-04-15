import { createSlice } from '@reduxjs/toolkit'
import {
    EmbedDictionaryType, initialEmbedDictionary
} from './__type.embed'
import {
    duplicator, consistent
} from '../../_helper/object.helper'

export interface EmbedDictionaryPropsInterface {
    EmbedDictionary?: EmbedDictionaryType
    dispatch?       : any
}
export type EmbedDictionaryInterface = EmbedDictionaryType
export const initialState: EmbedDictionaryType = initialEmbedDictionary

const slice = createSlice({
    name: 'EmbedDictionary',
    initialState,
    reducers: {
        add: (state: any, action: any) => {
            const doc = duplicator(state.docs)
            if (!consistent(doc, initialEmbedDictionary.docs))
                doc.push(action.doc)
            else
                doc[0] = action.doc
            console.log('doc', doc)
            return Object.assign({}, state, {
                docs: doc
            })
        },
        del: (state: any, action: any) => {
            const doc = duplicator(state.docs)
            if (!consistent(doc, initialEmbedDictionary.docs))
                doc.splice(action.index, 1)

            return Object.assign({}, state, {
                docs: doc
            })
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
})

export default slice.reducer
