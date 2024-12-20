import {
    StreamOptionsType,
    
} from '../../_lib/gpt/_helper/stream.helper'
import { RealTimeService } from '../../_lib/gpt/realtime.service'
import { StreamFormType } from '../stream/reducers/__type.stream'

export class StreamModel {
    private static instance: StreamModel

    public static call(key: string): StreamModel {
        if (!StreamModel.instance) {
            StreamModel.instance = new StreamModel(key)
        }
        return StreamModel.instance
    }

    public constructor(key: string) {
        RealTimeService.call().setAPIKey(key)
    }

    public setCallback(callback: any): StreamModel {
        RealTimeService.call().setCallback(callback)
        RealTimeService.call().conn()
        return this
    }

    public call(
        text: string,
    ): StreamModel {
        RealTimeService.call()
            .conn()
            .send(text)
        return this
    }
}