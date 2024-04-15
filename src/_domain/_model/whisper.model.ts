import { WhisperService } from '../../_lib/gpt/whisper.service'

export class WhisperModel {
    private static instance: WhisperModel

    private Whisper: WhisperService | undefined = undefined;

    public static call(key: string): WhisperModel
    {
        if (!WhisperModel.instance) {
            WhisperModel.instance = new WhisperModel(key);
        }
        return WhisperModel.instance;
    }

    public constructor(key: string)
    {
        this.Whisper = WhisperService.call().setAPIKey(key)
    }

    public async callWhisper(
        options: any,
    ): Promise<any> {
        console.log(options)

        if (!this.Whisper) {
            return
        }
        this.Whisper
                .setResponseFormat(options.response_format ? options.response_format : 'text')
                .setTemperature(options.temperature ? options.temperature : 0.5)
        await this.Whisper.setAudioFile(options.audio)
        await this.Whisper.do()
        return this.Whisper.getResult()
    }
}