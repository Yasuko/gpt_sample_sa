import { PaintService } from '../../../_lib/paint/paint.service'
import { ImageResizeService } from '../../../_lib/image/image_resize.service'
import { ImageInformationService } from '../../../_lib/image/image_information.service'

export const setupPaint = async (
    target  : string = 'painttarget',
    image   : string = ''
): Promise<void> => {
    await ImageInformationService.call().set(image)
    const size = ImageInformationService.call().getSize()
    const scale = await getImageScale(image)


    await PaintService.call()
        .setRatio(2)
        .setPaintTarget(target, {width: size.width, height: size.height})
        .setLineWidth(140)
        .setLineColor('rgba(0,250,0,1.0)')
        //.setFillColor('rgba(rgba(0,250,0,1.0))')
        .setEraseMode(false)
        .setScale(scale)
        .setBaseImage(image)

    PaintService.call().setMouseEvent()
/*
    setTimeout(() => {
        PaintService.call().addRect(
            {x:0, y:0},
            {x:500, y:500}
        )
    }, 500)
    */
}

/**
 * マスクの色調を反転した画像を返す
 */
export const getInvertMask = async (
    mask: string
): Promise<string> => {
    const d = PaintService.call().callDrawHelper()
    return await d.reverseImage(mask)
}

/**
 * 第1引数の画像サイズに、第2引数の画像をリサイズする
 * @param org_image string
 * @param match_image string
 * @returns Promise<string>
 */
export const toMatchImage = async (
    org_image: string,
    match_image: string,
): Promise<string> => {
    await ImageInformationService.call().set(org_image)
    const size = ImageInformationService.call().getSize()
    const r = await ImageResizeService.call()
                        .publishResize(match_image, size.width, size.height)
    return r
}

const getImageScale = async (
    org_image: string,
    calc_size: {width: number, height: number} = {width: 0, height: 0}
): Promise<{x: number, y: number}> => {
    
    let size = {width: 0, height: 0}

    if (calc_size.width === 0 || calc_size.height === 0) {
        await ImageInformationService.call().set(org_image)
        size = ImageInformationService.call().getSize()
    }

    return {x: 500 / size.width, y: 500 / size.height}
}