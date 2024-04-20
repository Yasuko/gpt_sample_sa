import {
    ImageOptions, initialImageOption,
    ImageEditOptions, initialImageEditOption,
    ImageChangeOptions, initialImageChangeOption,
} from '../../../_lib/gpt/type.service'

export type ImageType = ImageOptions
export const ImageInitialState: ImageType = initialImageOption

export type ImageEditType = ImageEditOptions & {
    image_base64: string,
    mask_base64: string,
}
export const ImageEditInitialState: ImageEditType = {
    ...initialImageEditOption,
    image_base64: '',
    mask_base64: '',
}

export type ImageChangeType = ImageChangeOptions & {
    image_base64: string
}
export const ImageChangeInitialState: ImageChangeType = {
    ...initialImageChangeOption,
    image_base64: '',
}

export type ImageListType = {
    images: {
        image   : string,
        mask    : string,
        prompt  : string,
        revised_prompt?  : string,
        job     : 'edit' | 'change' | 'generate',
    }[]
}

export const ImageListInitialState: ImageListType = {
    images: []
}

export type ImageScreenType = {
    base    : boolean,
    edit    : boolean,
    change  : boolean,
    subscreen: string,
}
export const ImageScreenInitialState: ImageScreenType = {
    base    : true,
    edit    : false,
    change  : false,
    subscreen: ''
}