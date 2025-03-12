import {
    ChatMessagesType,
    ChatReturnType
} from '../../_lib/gpt/_helper/chat.helper'
import { ChatService } from '../../_lib/gpt/chat.service'

export class ChatModel {
    private static instance: ChatModel

    public static call(key: string): ChatModel {
        if (!ChatModel.instance) {
            ChatModel.instance = new ChatModel(key)
        }
        return ChatModel.instance
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