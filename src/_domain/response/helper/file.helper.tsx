// import Library
import { DragService } from '../../../_lib/drag/drag.service'

/**
 * FileHelperクラス。
 * ファイル操作やドラッグ＆ドロップの処理を提供します。
 */
export class FileHelper {
    private static instance: FileHelper;

    /**
     * ファイルデータを格納する配列。
     */
    private file: any = [];

    /**
     * 画像データを格納する配列。
     */
    private image: any = [];

    /**
     * 音声データを格納する配列。
     */
    private audio: any = [];

    /**
     * FileHelperのインスタンスを取得します。
     * シングルトンパターンを採用しています。
     *
     * @returns FileHelperのインスタンス。
     */
    public static call(): FileHelper {
        if (!FileHelper.instance) {
            FileHelper.instance = new FileHelper();
        }
        return FileHelper.instance;
    }

    /**
     * 最初のファイルデータを取得します。
     *
     * @returns 最初のファイルデータ。
     */
    public getDataFile(): any {
        return this.file;
    }

    /**
     * すべての画像データを取得します。
     *
     * @returns 画像データの配列。
     */
    public getImages(): any {
        return this.image;
    }

    /**
     * すべての音声データを取得します。
     *
     * @returns 音声データの配列。
     */
    public getAudios(): any {
        return this.audio;
    }

    /**
     * ドラッグ開始時の処理を行います。
     *
     * @param target - ドラッグ対象のID。
     * @returns FileHelperのインスタンス。
     */
    public async dragStart(target = 'dragtarget'): Promise<FileHelper> {
        await DragService.call().setTarget(target);
        return this;
    }

    /**
     * ドラッグ終了時の処理を行います。
     *
     * @param e - ドラッグイベント。
     * @returns FileHelperのインスタンス。
     */
    public async dragEnd(
        e: React.DragEvent | DragEvent
    ): Promise<FileHelper> {
        await DragService.call().onDrop(e);
        this.image = DragService.call().getImage();
        const file = DragService.call().getFile();

        file.forEach((f: any) => {
            switch (f.type) {
                case 'mp3':
                case 'wav':
                case 'acc':
                case 'm4a':
                case 'ogg':
                    this.audio.push(f);
                    break;
                default:
                    this.file.push(f);
                    break;
            }
        });
        return this;
    }
}
