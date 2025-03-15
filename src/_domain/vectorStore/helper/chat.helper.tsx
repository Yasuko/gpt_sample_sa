import { ChatMessagesType } from '../../../_lib/gpt/_helper/chat.helper'
import { ChatService } from '../../../_lib/gpt/chat.service'

/**
 * ChatHelperクラス。
 * チャットメッセージのセットアップやAPIキーの管理を行います。
 */
export class ChatHelper {
    private static instance: ChatHelper;

    /**
     * APIキーを格納するプロパティ。
     */
    private API_KEY: string = '';

    /**
     * ChatHelperのインスタンスを取得します。
     * シングルトンパターンを採用しています。
     *
     * @returns ChatHelperのインスタンス。
     */
    public static call(): ChatHelper {
        if (!ChatHelper.instance) {
            ChatHelper.instance = new ChatHelper();
        }
        return ChatHelper.instance;
    }

    /**
     * APIキーを設定します。
     *
     * @param key - 設定するAPIキー。
     * @returns ChatHelperのインスタンス。
     */
    public setAPIKey(key: string): ChatHelper {
        this.API_KEY = key;
        return this;
    }

    /**
     * チャットメッセージのセットアップを行います。
     *
     * @param message - チャットメッセージの配列。
     * @param history - チャット履歴。
     */
    public setup(message: ChatMessagesType[], history: any) {
        ChatService.call()
                .setAPIKey(this.API_KEY);
        if (history === undefined)
            ChatService.call()
                .setMessage(message);
        else
            ChatService.call()
                .setMessage(message);
    }

    /**
     * チャットの結果を取得します。
     *
     * @returns チャットの結果。
     */
    public async getResult(): Promise<any> {
        await ChatService.call().do();
        console.log(ChatService.call().getResult());
        return ChatService.call().getResult();
    }

    /**
     * APIキーが設定されているか確認します。
     *
     * @returns APIキーが設定されている場合はtrue、そうでない場合はfalse。
     */
    public checkApiKey(): boolean {
        return this.API_KEY === '' ? false : true;
    }
}