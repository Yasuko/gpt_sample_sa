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
        return this.file[0];
    }

    /**
     * すべての画像データを取得します。
     *
     * @returns 画像データの配列。
     */
    public getImages(): any {
        return this.file;
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
        this.file = DragService.call().getImage();
        return this;
    }
}
