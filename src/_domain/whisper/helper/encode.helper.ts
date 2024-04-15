import { EncoderService } from '../../../_lib/encoder/encoder.service'
import { RecordType } from '../reducers/WhisperForm'
export class EncodeHelper {
    private static instance: EncodeHelper

    public static call() {
        if (!EncodeHelper.instance) {
            EncodeHelper.instance = new EncodeHelper()
        }
        return EncodeHelper.instance
    }

    public async setup(file: File, name: string): Promise<EncodeHelper> {
        EncoderService.call().setup(
                await this.fileToBase64(file),
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
     * @returns {Promise<EncodeHelper>} - returns the result of the encoder
     */
    public async toMp3(): Promise<EncodeHelper> {
        await EncoderService.call().wavToMp3()
        return this
    }

    public async separateAudio(extension: string): Promise<any>
    {
        await EncoderService.call().separateMp3(extension)
        return this
    }

    /**
     * wavに変換する
     * @param {string} file - base64 string
     * @returns {Promise<EncodeHelper>} - returns the result of the encoder
     */
    public async toBase64(file: File): Promise<string> {
        const str = await EncoderService.call().fileToBase64(file)
        return str
    }

    /**
     * 音声ファイルを分割する
     * @param {time} number
     * @returns Promise<RecordType[]>
     */
    public async split(
        time: number
    ): Promise<RecordType[]> {
        const files: RecordType[] = [];
        let stime: number = 0;
        let etime: number = 0;
        
        const count = Math.floor(time / 180) + 1;
        for (let i = 0 ; i <  count; i++) {
            stime = i * 180;
            etime = (i + 1) * 180;

            if (time < etime) {
                etime = time
            }
            await EncoderService.call().splitMp3(stime, etime);
            //const f = EncoderService.call().getBase64Result()
            const f = EncoderService.call().getResult()
            files.push({
                rec         : f.data,
                name        : `${f.name}_${stime}_${etime}.mp3`,
                time        : etime - stime,
                text        : '',
                formation   : '',
                summary     : '',
                textType    : 'txt',
                extension   : 'mp3',
            });
        }
        
        return files;
    }

    private async fileToBase64(
        file: File
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
    
            const newFile = new File([file], file.name, { type: file.type });
    
            reader.readAsDataURL(newFile);
        });
    }

}