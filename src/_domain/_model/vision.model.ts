import { VisionService } from '../../_lib/gpt/vision.service'

export type VisionReturn = {
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

export class VisionModel {
    private static instance: VisionModel

    public static call(key: string): VisionModel {
        if (!VisionModel.instance) {
            VisionModel.instance = new VisionModel(key)
        }
        return VisionModel.instance
    }

    public constructor(key: string) {
        VisionService.call().setAPIKey(key)
    }

    public async question(
        image: string,
        message: string,
        options: any
    ): Promise<VisionReturn> {
        VisionService.call()
            .setImage(image, message)
            .setOptions(options)
        
        await VisionService.call().do()
        return VisionService.call().getResult()
    }
}