import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import reducer
import {
    ImageEditOptionPropsInterface,
    ImageEditOptionInterface,
    initialState
} from '../../_domain/image/reducers/ImageEditOption';

export const MaskEditor = (): JSX.Element => {
    const dispatch = useDispatch();    
    // コンテンツ表示Reducer呼び出し
    const io = useSelector((state: ImageEditOptionPropsInterface): ImageEditOptionInterface => {
        return state.ImageEditOption === undefined ? initialState : state.ImageEditOption
    })

    useEffect(() => {
        dispatch({
            type: 'ImageEditAction/setupMaskPaint',
        })
        //const c = document.getElementById('mask-paint-target') as HTMLCanvasElement
        //c.width = 1024
        //c.height = 1024
    },[])

    return (
        <div className='whisper-option'>
            <img src={io.image_base64} alt='BaseImage' className='image-editor-baseimage'/>
            <canvas id="mask-paint-target" className='image-editor-canvaszone' />
            <div className='image-editor-caption'>
                <span>
                    再生成させたい箇所をマウスで塗りつぶしてください
                </span>
            </div>
            <div
                className='btn btn-secondary image-editor-button'
                onClick={() => {
                    dispatch({
                        type    : 'ImageEditAction/saveMakeMask',
                        mask_base64    : getCanvasToBase64()
                    })
                    dispatch({
                        type    : 'ImageScreen/setSubScreen',
                        subscreen: ''
                    })
                }}>
                Save
            </div>

        </div>
    )
}

const getCanvasToBase64 = (): string => {
    const c = document.getElementById('mask-paint-target') as HTMLCanvasElement
    return c.toDataURL('image/png')
}

export default MaskEditor