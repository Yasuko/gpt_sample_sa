import { ChatService } from '../../_lib/gpt/chat.service'
import { Chat } from '../chat/reducers/__type.chat'

export type ChatReturn = {
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
        text: string,
        history: [Chat] | undefined,
        options: any
    ): Promise<ChatReturn> {
        ChatService.call()
            .setOptions(options)
            .setHistory(history)
            .setMessage(text)
        await ChatService.call().do()
        return ChatService.call().getResult()
    }
}