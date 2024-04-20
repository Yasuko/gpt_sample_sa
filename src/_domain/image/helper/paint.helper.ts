import { PaintService } from '../../../_lib/paint/paint.service'
import { ImageResizeService } from '../../../_lib/image/image_resize.service'
import { ImageInformationService } from '../../../_lib/image/image_information.service'

export const setupPaint = async (target = 'painttarget'): Promise<void> => {
    const t = document.getElementById(target) as HTMLCanvasElement
    PaintService.call()
        .setPaintTarget(t)
        .setLineWidth(20)
        .setLineColor('rgba(0,250,0,0.4)')
        .setFillColor('rgba(0,0,0,1.0)')
        .setEraseMode(true)

    PaintService.call().setMouseEvent()

    setTimeout(() => {
        PaintService.call().addRect(
            {x:0, y:0},
            {x:500, y:500}
        )
    }, 500)
}

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