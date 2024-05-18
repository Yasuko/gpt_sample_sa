import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import reducer
import {
    EmbedDictionaryPropsInterface,
    EmbedDictionaryInterface,
    initialState
} from '../../_domain/embed/reducers/EmbedDictionary'

// import component

export const DocList = (): JSX.Element => {
    const dispatch = useDispatch()
    const ed = useSelector((state: EmbedDictionaryPropsInterface): EmbedDictionaryInterface => {
        return state.EmbedDictionary === undefined ? initialState : state.EmbedDictionary
    })

    const list = ed.docs.map((doc, index) => {
        return (
            <li key={index} className="list-inline-item embed-doc-list">
                <div className="embed-doc-list-doc">
                    <pre>
                        {doc.document}
                    </pre>
                </div>
                <div className="embed-doc-list-embed">
                    <pre>
                        {doc.embed}
                    </pre>
                </div>
            </li>
        )
    })
    return (
        <ul className='list-inline'>
            {list}
        </ul>
    )
}

export default DocList


