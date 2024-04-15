import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import reducer
import {
    SpeechFormPropsInterface,
    SpeechFormInterface,
    initialState
} from '../../_domain/speech/reducers/SpeechForm'

// import component
import Option from './Option'

export const Speech = (): JSX.Element => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'TokenAction/checkToken',
            return: 'Speech'
        })
    })

    const cf = useSelector((state: SpeechFormPropsInterface): SpeechFormInterface => {
        return state.SpeechForm === undefined ? initialState : state.SpeechForm
    })
    return (
        <div className='container row'>
            <h4>Speech</h4>
            <br></br><br></br>
            <div className="col-4">

                <div className="container">
                    <label className="sr-only" htmlFor="text1">Text</label>
                    <textarea
                        cols={80}
                        rows={8}
                        className="form-control mb-2"
                        id="text1"
                        placeholder="Input Sample"
                        defaultValue={cf.message}
                        onChange={(e) => {
                            dispatch({
                                type     : 'SpeechForm/setMessage',
                                message  : e.target.value
                            })
                        }} />
                    <div
                        className='btn btn-info margin'
                        onClick={() => {
                            dispatch({
                                type: 'SpeechAction/sendSpeech'
                            })
                            clear()
                        }}>
                        Send
                    </div>
                    <div
                        className='btn btn-secondary margin'
                        onClick={() => {
                            dispatch({
                                type     : 'SpeechForm/setMessage',
                                message  : ''
                            })
                            clear()
                        }}>
                        Clear
                    </div>
                </div>
                <Option />
            </div>
            <div className='col-8'>
                { Result(cf, dispatch) }
            </div>
        </div>
    )
}

const clear = () => {
    const t = document.getElementById('text1') as HTMLTextAreaElement
    t.value = ''
}

const Result = (
    cf: SpeechFormInterface, dispatch: any
): JSX.Element => {
    if (cf.results === '') return (<div className='chat-list'>none</div>)

    const list = cf.results.map((val: any, i: number) => {
        return (
            <div className="list-group-item" key={i}>

                    { val.text }

                    <button
                        className='btn btn-primary margin'
                        onClick={() => {
                            dispatch({
                                type: 'SpeechAction/playSpeech',
                                audio: val.audio
                            })
                        }}>
                            再生
                    </button>

            </div>
        )
    })

    return (
        <ul className='list-group'>
            {list}
        </ul>
    )
}

export default Speech


