import { EmbedService } from '../../_lib/gpt/embed.service'
import { EmbedReturnType } from '../../_lib/gpt/_helper/embed.helper'

export class EmbedModel {
    private static instance: EmbedModel

    private Embed: EmbedService | undefined = undefined

    public static call(key: string): EmbedModel
    {
        if (!EmbedModel.instance) {
            EmbedModel.instance = new EmbedModel(key)
        }
        return EmbedModel.instance
    }

    public constructor(key: string)
    {
        this.Embed = EmbedService.call().setAPIKey(key)
    }

    public async callEmbed(
        text: string,
        options: any,
    ): Promise<EmbedReturnType | false> {

        if (!this.Embed) {
            return false
        }
        this.Embed.setInput(text).setEncodeFormat(options.encode_format)
        await this.Embed.do()
        return this.Embed.getResult()
    }
}