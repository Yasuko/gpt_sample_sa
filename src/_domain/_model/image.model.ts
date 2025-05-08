import { ImageService } from '../../_lib/gpt/image.service'

export type ImageReturn = {
    choices: {
        finish_reason: string,
        index: number,
        logprobs: any,
        message: {
            content: string,
            role: string
        }
    }[],
    created: number,
    id: string,
    model: string
    object: string
    system_fingerprint: string
}

export class ImageModel {
    private static instance: ImageModel

    public static call(key: string): ImageModel {
        if (!ImageModel.instance) {
            ImageModel.instance = new ImageModel(key)
        }
        return ImageModel.instance
    }

    public constructor(key: string) {
        ImageService.call().setAPIKey(key)
    }

    public async generate(
        job: 'generate' | 'edit' | 'change',
        options: any
    ): Promise<ImageReturn> {
        await ImageService.call()
                .setJob(job)
                .setOptions(options)
        // console.log('ImageModel.generate', job, options)
        ImageService.call().ini()
        await ImageService.call().do()
        return ImageService.call().getResult()
    }
}