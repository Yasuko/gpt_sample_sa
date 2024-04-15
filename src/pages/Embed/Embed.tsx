import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import reducer
import {
    EmbedFormPropsInterface,
    EmbedFormInterface,
    initialState
} from '../../_domain/embed/reducers/EmbedForm'

// import component
import Option from './Option'
import DocList from './DocList'

export const Embed = (): JSX.Element => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'TokenAction/checkToken',
            return: 'Embed'
        })
    })

    const ef = useSelector((state: EmbedFormPropsInterface): EmbedFormInterface => {
        return state.EmbedForm === undefined ? initialState : state.EmbedForm
    });
    return (
        <div className='container row'>
            <h4>Embed</h4>
            <br></br><br></br>
            <div className="col-4">
                <div className="form-group row">
                    <div
                        id="File1b"
                        className="drag-area center"
                        onDragOver={(e) => onDragStart(e, dispatch)}
                        onDrop={(e) => onDragEnd(e, dispatch)}
                    >
                        Drag Area<br></br>
                        (Support type txt, pdf, )
                    </div>
                </div>
                <div className="container">
                    <label className="sr-only" htmlFor="text1">Convert</label>
                    <textarea
                        cols={80}
                        rows={8}
                        className="form-control mb-2"
                        id="embedBaseText"
                        placeholder="Enter Base text"
                        defaultValue={ef.input}
                        />
                    <div
                        className='btn btn-info margin'
                        onClick={() => {
                            dispatch({
                                type: 'EmbedAction/send',
                                input: getBaseText()
                            })
                            clear()
                        }}>
                        Add
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
                <div className="container">
                    <label className="sr-only" htmlFor="text1">Options</label>
                    <Option />
                </div>
            </div>
            <div className='col-8'>
                <DocList />
            </div>
        </div>
    )
}

const clear = () => {
    const t = document.getElementById('embedBaseText') as HTMLTextAreaElement
    t.value = ''
}

const getBaseText = () => {
    const t = document.getElementById('embedBaseText') as HTMLTextAreaElement
    return t.value
}

const onDragStart = (e: any, dispatch: any): void => {
    const _e = e as Event;
    _e.preventDefault();
    dispatch({
        type    : 'EmbedAction/dragStart',
        event   : _e,
    })
}

const onDragEnd = (e: any, dispatch: any): void => {
    const _e = e as Event;
    _e.preventDefault();
    
    dispatch({
        type    : 'EmbedAction/dragEnd',
        event   : _e,
    });
    _e.stopPropagation();
}

export default Embed


