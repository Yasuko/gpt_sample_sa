import { ChatContent, ChatReturn } from '../../_lib/gpt/_helper/chat.helper'
import { ChatService } from '../../_lib/gpt/chat.service'
import { Chat } from '../chat/reducers/__type.chat'

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
        content: ChatContent[],
        history: [Chat] | undefined,
        options: any
    ): Promise<ChatReturn> {
        ChatService.call()
            .setOptions(options)
            //.setHistory(history)
            .setMessage(content)
        await ChatService.call().do()
        return ChatService.call().getResult()
    }
}