// import Library
import { DragService } from '../../../_lib/drag/drag.service'
import { FileService } from '../../../_lib/drag/file.service'
import { ImageHelper } from '../../../_lib/image/helper/image.helper'

/**
 * ファイル操作やドラッグイベントを管理するヘルパークラス
 * シングルトンパターンを使用してインスタンスを管理します。
 */
export class FileHelper {
    private static instance: FileHelper
    private file: any = []
    private fileType: 'image' | 'pdf' = 'image'

    /**
     * コンストラクタ
     * インスタンスを返します。
     */
    public constructor() {
        return this
    }

    /**
     * シングルトンインスタンスを取得する
     * @returns FileHelper インスタンス
     */
    public static call(): FileHelper {
        if (!FileHelper.instance) {
            FileHelper.instance = new FileHelper()
        }
        return FileHelper.instance
    }

    /**
     * 最初のファイルの画像データを取得する
     * @returns any 画像データ
     */
    public getFile(): any {
        return this.file[0].image
    }

    /**
     * 最初のファイルデータを取得する
     * @returns any ファイルデータ
     */
    public getDataFile(): any {
        return this.file[0]
    }

    /**
     * ファイルの種類を取得する
     * @returns 'image' | 'pdf' ファイルの種類
     */
    public getFileType(): 'image' | 'pdf' {
        return this.fileType
    }

    /**
     * すべての画像データを取得する
     * @returns any 画像データの配列
     */
    public getImages(): any {
        return this.file
    }

    /**
     * ドラッグ開始時の処理を設定する
     * @param target string ドラッグターゲットのID
     * @returns Promise<FileHelper> 自身のインスタンス
     */
    public async dragStart(target = 'dragtarget'): Promise<FileHelper> {
        await DragService.call().setTarget(target)
        return this
    }

    /**
     * ドラッグ終了時の処理を実行する
     * ドロップイベントを処理し、ファイルデータを取得します。
     * @param e any ドロップイベント
     * @returns Promise<FileHelper> 自身のインスタンス
     */
    public async dragEnd(e: any): Promise<FileHelper> {
        await DragService.call().onDrop(e);
        this.file = DragService.call().getImage()
        if (this.file.length === 0) {
            this.file = DragService.call().getFile()
            this.fileType = 'pdf'
        }
        return this
    }

    /**
     * ファイル選択時の処理を実行する
     * @param e any ファイル選択イベント
     * @returns Promise<FileHelper> 自身のインスタンス
     */
    public async selectFile(e:any): Promise<FileHelper> {
        await FileService.call().setFile(e, 'select')
        this.file = await FileService.call().getAllImage()
        return this
    }

    /**
     * 画像データをHTMLImageElementに変換する
     * @param image string 画像データ
     * @returns Promise<HTMLImageElement> HTMLImageElementオブジェクト
     */
    public async toImageElement(image: string): Promise<HTMLImageElement> {
        await ImageHelper.call().setImage(image)
        return ImageHelper.call().getImageForElement()
    }
}
