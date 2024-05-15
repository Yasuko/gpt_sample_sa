// import Library
import { DragService } from '../../../_lib/drag/drag.service'

export class FileHelper {
    private static instance: FileHelper

    private file: any = []

    public static call(): FileHelper {
        if (!FileHelper.instance) {
            FileHelper.instance = new FileHelper()
        }
        return FileHelper.instance
    }
    public getDataFile(): any {
        return this.file[0]
    }

    public getImages(): any {
        return this.file
    }

    public async dragStart(target = 'dragtarget'): Promise<FileHelper> {
        await DragService.call().setTarget(target)
        return this
    }

    public async dragEnd(e: any): Promise<FileHelper> {
        await DragService.call().onDrop(e);
        this.file = DragService.call().getImage()
        return this
    }
}
