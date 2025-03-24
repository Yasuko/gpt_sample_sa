import React from 'react'

// import reducer
import {
    VectorStoreScreenPropsInterface,
    VectorStoreScreenInterface,
    initialState
} from '../../_domain/vectorStore/reducers/VectorStoreScreen'
import { useDispatch, useSelector } from 'react-redux'

// import component
import StoreForm from './StoreForm'
import StoreEdit from './StoreEdit'


export const VectorStoreScreen = () => {

    const dispatch = useDispatch()

    const screen = useSelector((state: VectorStoreScreenPropsInterface): VectorStoreScreenInterface => {
        return state.VectorStoreScreen === undefined ? initialState : state.VectorStoreScreen
    })

    if (screen.show === false) return <></>

    return (
        <div className="
        absolute top-[10%] 
        w-full min-w-[300px] h-full bg-gray-800 bg-opacity-95
        rounded-lg p-20
        gap-4">
            <div className='w-full ms-auto flex justify-center gap-x-2 mb-4'>
                <h1>Vector Store Screen</h1>
            </div>
            { ComponentSwitch(screen.target) }

        </div>
    )
}

const ComponentSwitch = (content: string) => {
    switch (content) {
        case 'store_form':
            return <StoreForm />
        case 'store_edit':
            return <StoreEdit />
        default:
            return <></>
    }
}

export default VectorStoreScreen