import {
    ChatMessagesType,
    ChatReturnType
} from '../../_lib/gpt/_helper/chat.helper'
import { ChatService } from '../../_lib/gpt/chat.service'

export class ResponseModel {
    private static instance: ResponseModel

    public static call(key: string): ResponseModel {
        if (!ResponseModel.instance) {
            ResponseModel.instance = new ResponseModel(key)
        }
        return ResponseModel.instance
    }

    public constructor(key: string) {
        ChatService.call().setAPIKey(key)
    }

    public async callDocumetSummary(
        content: ChatMessagesType[],
        options: any
    ): Promise<ChatReturnType> {
        ChatService.call()
            .setOptions(options)
            .setMessage(content)
        await ChatService.call().do()
        return ChatService.call().getResult()
    }
}