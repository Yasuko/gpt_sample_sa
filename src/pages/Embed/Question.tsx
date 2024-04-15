import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import reducer
import {
    EmbedFormPropsInterface,
    EmbedFormInterface,
    initialState
} from '../../_domain/embed/reducers/EmbedForm'

// import component

export const Question = (): JSX.Element => {
    const dispatch = useDispatch();

    const ef = useSelector((state: EmbedFormPropsInterface): EmbedFormInterface => {
        return state.EmbedForm === undefined ? initialState : state.EmbedForm
    })
    return (
        <div className='container row'>
            <div className="col-4">
                <div className="container">
                    <label className="sr-only" htmlFor="text1">Question</label>
                    <textarea
                        cols={80}
                        rows={8}
                        className="form-control mb-2"
                        id="embedQuestion"
                        placeholder="Enter Question"
                        defaultValue={ef.question}
                        />
                    <div
                        className='btn btn-info margin'
                        onClick={() => {
                            dispatch({
                                type: 'EmbedAction/docSearch',
                                question: getQuestion()
                            })
                            clear()
                        }}>
                        Send
                    </div>
                    <div
                        className='btn btn-secondary margin'
                        onClick={() => {
                            dispatch({
                                type: 'ChatForm/reset'
                            })
                            clear()
                        }}>
                        Clear
                    </div>
                </div>
            </div>
        </div>
    )
}

const clear = () => {
    const t = document.getElementById('embedQuestion') as HTMLTextAreaElement
    t.value = ''
}

const getQuestion = () => {
    const t = document.getElementById('embedQuestion') as HTMLTextAreaElement
    return t.value
}

export default Question
