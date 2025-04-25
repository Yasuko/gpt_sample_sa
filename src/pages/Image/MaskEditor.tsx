import { JSX, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import reducer
import {
    ImageEditOptionPropsInterface,
    ImageEditOptionInterface,
    initialState
} from '../../_domain/image/reducers/ImageEditOption'

export const MaskEditor = (): JSX.Element => {
    const dispatch = useDispatch()
    // コンテンツ表示Reducer呼び出し
    const io = useSelector((state: ImageEditOptionPropsInterface): ImageEditOptionInterface => {
        return state.ImageEditOption === undefined ? initialState : state.ImageEditOption
    })

    let css = 'p-5 absolute w-[1024px] h-[1024px]'

    switch (io.size) {
        case '256x256':
            css = 'p-5 absolute w-[512px] h-[512px]'
            break
        case '512x512':
            css = 'p-5 absolute w-[512px] h-[512px]'
            break
        case '1024x1024':
            css = 'p-5 absolute w-[512px] h-[512px]'
            break
        default:
            css = 'p-5 absolute w-[512px] h-[512px]'
            break
    }

    useEffect(() => {
        dispatch({
            type: 'ImageEditAction/setupMaskPaint',
        })
        //const c = document.getElementById('mask-paint-target') as HTMLCanvasElement
        //c.width = 1024
        //c.height = 1024
    },[])

    return (
        <div
            className='
                absolute top-0 left-0 w-svw h-full
                p-36
                flex flex-col
                items-center justify-center 

                bg-gray-900 bg-opacity-80 z-50'>
            <div className='h-[512px] w-[512px]'>
                <img
                    src={io.image_base64}
                    alt='BaseImage'
                    className={css + ' opacity-80'}
                />
                <canvas
                    id="mask-paint-target"
                    width={512}
                    height={512}
                    className={css + ' cursor-pointer'}
                />
            </div>
            <div
                className='flex inline-flex items-center justify-center'>
                <div className='mx-4 leading-10 text-center'>
                fill out the areas you want to regenerate
                </div>
                <button
                    className='
                        ml-2 mr-4 py-2 px-4 inline-flex items-center gap-x-2
                        text-sm font-medium text-white
                        rounded-lg border border-transparent
                        bg-blue-600 
                        hover:bg-blue-700 focus:outline-none focus:bg-blue-700
                        disabled:opacity-50 disabled:pointer-events-none
                    '
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
                </button>
            </div>
        </div>
    )
}

const getCanvasToBase64 = (): string => {
    const c = document.getElementById('mask-paint-target') as HTMLCanvasElement
    return c.toDataURL('image/png')
}

export default MaskEditor