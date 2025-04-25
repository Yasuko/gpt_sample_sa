import { JSX } from 'react'
import { useSelector } from 'react-redux'

// import reducer
import {
    ImageScreenPropsInterface,
    ImageScreenInterface,
    initialState as initialScreen
} from '../../_domain/image/reducers/ImageScreen'

// import component
import MaskEditor from './MaskEditor'


export const Screen = (): JSX.Element => {
    const is = useSelector((state: ImageScreenPropsInterface): ImageScreenInterface => {
        return state.ImageScreen === undefined ? initialScreen : state.ImageScreen
    })

    if (is.subscreen === '') return (<div></div>)

    return (
        <div className='absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50'>
            <div>
                { checkScreen(is) }
            </div>
        </div>
    )
}

const checkScreen = (ss: ImageScreenInterface): JSX.Element => {
    if (ss.subscreen === 'mask') return <MaskEditor />

    return <div></div>
}

export default Screen
