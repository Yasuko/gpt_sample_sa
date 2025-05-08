// import Library
import { DragService } from '@/_lib/drag/drag.service'
import { FileService } from '@/_lib/drag/file.service'
import { ImageHelper } from '@/_lib/image/helper/image.helper'
import { ImageFormatService } from '@/_lib/image/image_format.service'
export class FileHelper {
    private static instance: FileHelper;

    private file: any;

    public constructor() {
        return this;
    }

    public static call(): FileHelper {
        if (!FileHelper.instance) {
            FileHelper.instance = new FileHelper();
        }
        return FileHelper.instance;
    }

    public getFile(): any {
        return this.file[0].image;
    }

    public getDataFile(): any {
        return this.file[0];
    }

    public getImages(): any {
        return this.file;
    }

    public async dragStart(target = 'dragtarget'): Promise<FileHelper> {
        await DragService.call().setTarget(target);
        return this;
    }

    public async dragEnd(e: any): Promise<FileHelper> {
        await DragService.call().onDrop(e);
        this.file = DragService.call().getImage()
        return this;
    }

    public async selectFile(e:any): Promise<FileHelper> {
        await FileService.call().setFile(e, 'select');
        this.file = await FileService.call().getAllImage();
        return this;
    }

    public async toImageElement(image: string): Promise<HTMLImageElement> {
        await ImageHelper.call().setImage(image);
        return ImageHelper.call().getImageForElement();
    }

    public async toPng(image: string, extention: 'jpeg' | 'webp' = 'jpeg'): Promise<string> {
        if (extention === 'jpeg') {
            return await ImageFormatService.call().jpegToPng(image)
        }
        if (extention === 'webp') {
            return await ImageFormatService.call().jpegToWebp(image)
        }
        return image;
    }
}
