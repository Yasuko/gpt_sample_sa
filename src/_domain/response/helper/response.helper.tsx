import { ResponseService } from '../../../_lib/gpt/response.service'
import { ResponseFormType, ResponseHistoryType } from '../reducers/__type.response';
import { ResponseItem, ResponseReturnType, OutputMessageObject, OutputImageObject } from '../../../_lib/gpt/_helper/response.output.type';

import {
    toInputText,
    toInputImage,
    toInputFile,
    toInputAudio,
    fromInputText
} from './pattern.helper'
import { ErrorResponseType } from '@/_lib/gpt/_definitions';

/**
 * ResponseHelperクラス。
 * チャットメッセージのセットアップやAPIキーの管理を行います。
 */
export class ResponseHelper {
    private static instance: ResponseHelper;

    /**
     * APIキーを格納するプロパティ。
     */
    private API_KEY: string = '';

    /**
     * ResponseHelperのインスタンスを取得します。
     * シングルトンパターンを採用しています。
     *
     * @returns ResponseHelperのインスタンス。
     */
    public static call(): ResponseHelper {
        if (!ResponseHelper.instance) {
            ResponseHelper.instance = new ResponseHelper();
        }
        return ResponseHelper.instance;
    }

    /**
     * APIキーを設定します。
     *
     * @param key - 設定するAPIキー。
     * @returns ResponseHelperのインスタンス。
     */
    public setAPIKey(key: string): ResponseHelper {
        this.API_KEY = key;
        return this;
    }

    /**
     * チャットメッセージのセットアップを行います。
     *
     * @param message - チャットメッセージの配列。
     * @param history - チャット履歴。
     */
    public setup() {
        ResponseService.call()
                .setAPIKey(this.API_KEY);
    }

    public setTalk(talk: ResponseFormType) {
        const inputs = [];
        if (talk.text && talk.text.trim() !== '') inputs.push(toInputText(talk.text));
        if (talk.image && talk.image.length > 0) inputs.push(toInputImage(talk.image));
        if (talk.file && talk.file.length > 0) inputs.push(toInputFile(talk.file));
        if (talk.audio && talk.audio.length > 0) inputs.push(toInputAudio(talk.audio));

        ResponseService.call()
                .setOptions({
                    model: 'gpt-5-nano',
                    input: [{
                        role: 'user',
                        content: inputs.flat(),
                }]
                });
    }

    /**
     * チャットの結果を取得します。
     *
     * @returns チャットの結果。
     */
    public async getResult(): Promise<ResponseHistoryType[] | ErrorResponseType> {
        await ResponseService.call().do();
        console.log(ResponseService.call().getOutput());
        const r = ResponseService.call().getResult();
        if ('error' in r && r.status === false) {
            return r;
        }
        const output = ResponseService.call().getOutput();
        return this.convertOutputToHistory(output);
    }

    /**
     * APIキーが設定されているか確認します。
     *
     * @returns APIキーが設定されている場合はtrue、そうでない場合はfalse。
     */
    public checkApiKey(): boolean {
        return this.API_KEY === '' ? false : true;
    }

    /**
     * ResponseReturnType.output のデータを ResponseHistoryType に変換します。
     *
     * @param output - 変換する ResponseItem の配列。
     * @returns 変換された ResponseHistoryType の配列。
     */
    public convertOutputToHistory(output: ResponseItem[]): ResponseHistoryType[] {
        const history: ResponseHistoryType[] = [];
        for (const item of output) {
            if (item.type === 'message') {
                const message = item as OutputMessageObject;
                for (const contentItem of message.content) {
                    if (contentItem.type === 'output_text') {
                        history.push({
                            role: 'assistant',
                            text: fromInputText(contentItem)
                        });
                    }
                    // 他の contentItem タイプは無視
                }
            }
            if (item.type === 'image_generation_call') {
                const img = item as OutputImageObject;
                // OutputImageObject -> ResponseHistoryType['image'] へ変換
                history.push({
                    role: 'assistant',
                    image: {
                        image: `data:image/${img.output_format};base64,${img.result}`,
                        date: Date.now(),
                        type: img.output_format === 'jpeg' ? 'jpeg' : (img.output_format as 'png' | 'jpg' | 'jpeg' | 'webp'),
                        name: `${img.id}.${img.output_format === 'jpeg' ? 'jpg' : img.output_format}`,
                        size: img.result.length,
                    }
                });
            }
            // 他の item タイプは無視
        }
        return history;
    }
}

