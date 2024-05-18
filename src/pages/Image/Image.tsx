import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import reducer
import {
    ImageScreenPropsInterface,
    ImageScreenInterface,
    initialState as initialScreen
} from '../../_domain/image/reducers/ImageScreen'

// import Hook

// import component
import Option from './Option'
import OptionEdit from './OptionEdit'
import OptionChange from './OptionChange'
import ListImage from './ListImage'

export const Image = (): JSX.Element => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'TokenAction/checkToken',
            return: 'Image'
        })
    })

    const is = useSelector((state: ImageScreenPropsInterface): ImageScreenInterface => {
        return state.ImageScreen === undefined ? initialScreen : state.ImageScreen
    })
    return (
        <div className='component row'>
            <h4>Generate Image</h4>
            <br></br><br></br>
            <div className='col-6'>
                <div className="form-row align-items-center">
                    <button
                        className='btn btn-secondary btn-xl margin'
                        onClick={() => {
                            dispatch({
                                type: 'ImageScreen/showBase'
                            })
                        }}
                        >Base</button>
                    <button
                        className='btn btn-secondary btn-xl margin'
                        onClick={() => {
                            dispatch({
                                type: 'ImageScreen/showEdit'
                            })
                        }}
                        >Edit</button>
                    <button
                        className='btn btn-secondary btn-xl margin'
                        onClick={() => {
                            dispatch({
                                type: 'ImageScreen/showChange'
                            })
                        }}
                        >Change</button>
                </div>
                <div className='container'>
                    { OptionChanger(is)}
                </div>
            </div>
            <div className='col-6'>
                <ListImage />
            </div>
        </div>
    )
}

const OptionChanger = (is: ImageScreenInterface): JSX.Element => {
    if (is.base) return <Option />
    if (is.edit) return <OptionEdit />
    if (is.change)return <OptionChange />
    return <></>
}

export default Image

