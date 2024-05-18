import React from 'react'
import { useSelector } from 'react-redux'

// import reducer
import {
    ImageListPropsInterface,
    ImageListInterface,
    initialState
} from '../../_domain/image/reducers/ImageList'

// import Hook

export const ListImage = (): JSX.Element => {
    const ifm = useSelector((state: ImageListPropsInterface): ImageListInterface => {
        return state.ImageList === undefined ? initialState : state.ImageList
    })

    return (
        <div className='component'>
            { ImageList(ifm) }
        </div>
    )
}

const ImageList = (ifm: ImageListInterface) => {
    if (ifm.images.length === 0)  return (<></>);
    const list = ifm.images.map((val, key) => {
        return (
            <div key={key}>
                <div>
                    <div>
                        Prompt:
                    </div>
                    <div>
                        {val.prompt}
                    </div>
                </div>
                <div>
                    <div>
                        Output:
                    </div>
                    <div>
                        <img width={400} src={val.image} ></img>
                    </div>
                </div>
            </div>
        );
    })
    return (
        <div>
            {list}
        </div>
    )
}

export default ListImage
