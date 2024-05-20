import { ChatContentType } from '../../../_lib/gpt/_helper/chat.helper'
import { ChatService } from '../../../_lib/gpt/chat.service'

export class ChatHelper {
    private static instance: ChatHelper

    private API_KEY: string = ''

    public static call(): ChatHelper {
        if (!ChatHelper.instance) {
            ChatHelper.instance = new ChatHelper();
        }
        return ChatHelper.instance;
    }

    public setAPIKey(key: string): ChatHelper {
        this.API_KEY = key;
        return this;
    }

    public setup(message: ChatContentType[], history: any) {
        ChatService.call()
                .setAPIKey(this.API_KEY)
        if (history === undefined)
            ChatService.call()
                .setMessage(message)
        else
            ChatService.call()
                .setHistory(history)
                .setMessage(message)
    }

    public buildSendContents(
        message: string,
        images: string[]
    ): ChatContentType[] {
        return [
            ChatService.call().convertContent(message),
            ...images.map((image: string) => {
                return ChatService.call().convertContent(image)
            })
        ]
    }

    public async getResult(): Promise<any> {
        await ChatService.call().do();
        console.log(ChatService.call().getResult())
        return ChatService.call().getResult();
    }

    public checkApiKey(): boolean {
        return this.API_KEY === '' ? false : true;
    }
}