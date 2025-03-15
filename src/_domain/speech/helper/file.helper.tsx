// import Library
import { DragService } from '../../../_lib/drag/drag.service'
import { FileService } from '../../../_lib/drag/file.service'
import { ImageHelper } from '../../../_lib/image/helper/image.helper'

/**
 * ファイル操作（ドラッグ＆ドロップやファイル選択など）を管理するヘルパークラス。
 * ファイルデータの取得、ファイルタイプの判定、画像をHTML要素に変換するメソッドを提供します。
 *
 * @class FileHelper
 */
export class FileHelper {
    private static instance: FileHelper

    private file: any = []
    private fileType: 'image' | 'pdf' = 'image'

    public constructor() {
        return this
    }

    public static call(): FileHelper {
        if (!FileHelper.instance) {
            FileHelper.instance = new FileHelper()
        }
        return FileHelper.instance
    }

    /**
     * 最初の画像ファイルを取得します。
     *
     * @returns any 最初の画像ファイル。
     */
    public getFile(): any {
        return this.file[0].image
    }

    /**
     * 最初のファイルのデータを取得します。
     *
     * @returns any 最初のファイルのデータ。
     */
    public getDataFile(): any {
        return this.file[0]
    }

    /**
     * ファイルの種類（画像またはPDF）を取得します。
     *
     * @returns 'image' | 'pdf' ファイルの種類。
     */
    public getFileType(): 'image' | 'pdf' {
        return this.fileType
    }

    /**
     * すべての画像ファイルを取得します。
     *
     * @returns any すべての画像ファイル。
     */
    public getImages(): any {
        return this.file
    }

    /**
     * ターゲット要素のドラッグ操作を開始します。
     *
     * @param target string ドラッグ操作のターゲット要素。
     * @returns Promise<FileHelper> FileHelperインスタンス。
     */
    public async dragStart(target = 'dragtarget'): Promise<FileHelper> {
        await DragService.call().setTarget(target)
        return this
    }

    /**
     * ドラッグ操作を終了し、ドロップされたファイルを取得します。
     *
     * @param e any ドラッグ操作のイベントオブジェクト。
     * @returns Promise<FileHelper> FileHelperインスタンス。
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
     * ファイルを選択し、そのデータを取得します。
     *
     * @param e any ファイル選択のイベントオブジェクト。
     * @returns Promise<FileHelper> FileHelperインスタンス。
     */
    public async selectFile(e:any): Promise<FileHelper> {
        await FileService.call().setFile(e, 'select')
        this.file = await FileService.call().getAllImage()
        return this
    }

    /**
     * 画像をHTMLImageElementに変換します。
     *
     * @param image string 変換する画像。
     * @returns Promise<HTMLImageElement> HTMLImageElement形式の画像。
     */
    public async toImageElement(image: string): Promise<HTMLImageElement> {
        await ImageHelper.call().setImage(image)
        return ImageHelper.call().getImageForElement()
    }
}
