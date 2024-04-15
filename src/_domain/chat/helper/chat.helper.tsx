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

    public setup(message: string, history: any) {
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

    public async getResult(): Promise<any> {
        await ChatService.call().do();
        console.log(ChatService.call().getResult())
        return ChatService.call().getResult();
    }

    public checkApiKey(): boolean {
        return this.API_KEY === '' ? false : true;
    }
}