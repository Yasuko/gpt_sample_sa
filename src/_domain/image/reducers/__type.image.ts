import {
    ImageOptions, initialImageOption,
    ImageEditOptions, initialImageEditOption,
    ImageChangeOptions, initialImageChangeOption,
} from '../../../_lib/gpt/type.service'

export type ImageType = ImageOptions
export const ImageInitialState: ImageType = initialImageOption

export type ImageEditType = ImageEditOptions
export const ImageEditInitialState: ImageEditType = initialImageEditOption

export type ImageChangeType = ImageChangeOptions
export const ImageChangeInitialState: ImageChangeType = initialImageChangeOption

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
}
export const ImageScreenInitialState: ImageScreenType = {
    base    : true,
    edit    : false,
    change  : false,
}