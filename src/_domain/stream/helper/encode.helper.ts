import { EncoderService } from '../../../_lib/encoder/encoder.service'

export class EncodeHelper {
    private static instance: EncodeHelper

    public static call() {
        if (!EncodeHelper.instance) {
            EncodeHelper.instance = new EncodeHelper()
        }
        return EncodeHelper.instance
    }

    public async setup(file: string, name: string): Promise<EncodeHelper> {
        EncoderService.call().setup(
                //await this.toBase64(file),
                file,
                name
            )
        return this
    }
    
    /**
     * 結果を取得する
     * @returns {any} - returns the result of the encoder
     */
    public getResult(): any {
        return EncoderService.call().getResult()
        //return EncoderService.call().getBase64Result()
    }

    public download(
        file: string, extension: string, name: string
    ): void {
        EncoderService.call().saveAudio(file, extension, name)
        return
    }

    /**
     * mp3に変換する
     * @param extension string
     * @returns Promise<EncodeHelper>
     * returns the result of the encoder
     */
    public async toMp3(extension: string = 'wav'): Promise<EncodeHelper> {
        // await EncoderService.call().wavToMp3()
        await EncoderService.call().toMp3(extension)
        return this
    }

    public async separateAudio(extension: string): Promise<any>
    {
        await EncoderService.call().separateMp3(extension)
        return this
    }

    /**
     * FileをBase64に変換する
     * @param file file
     * @returns Promise<EncodeHelper>
     */
    public async toBase64(file: File): Promise<string> {
        const str = await EncoderService.call().fileToBase64(file)
        return str
    }




}