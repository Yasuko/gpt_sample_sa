import { base64ToFile, extensionToDataURIHeader } from '../../_lib/_helper/convert.helper'
import {
    FileListResponseType, FileResponseType
} from '../../_lib/gpt/_helper/file.helper'
import { FileService } from '../../_lib/gpt/file.service'
import { FileFormInterface } from '../file/reducers/FileForm'

export class FileModel {
    private static instance: FileModel

    public static call(key: string): FileModel {
        if (!FileModel.instance) {
            FileModel.instance = new FileModel(key)
        }
        return FileModel.instance
    }

    public constructor(key: string) {
        FileService.call().setAPIKey(key)
    }

    public async multiUpload(files: FileFormInterface['files']): Promise<any> {
        let resutls: any = []
        files.forEach(async (file) => {
            resutls.push(await this.upload(file))
        })
        return resutls
    }

    public async upload(file: FileFormInterface['files'][0]): Promise<any> {

        const base64Data = file.data.split(',')[1]; // Remove the header part of the base64 string
        console.log(base64Data)
        return await FileService.call().uploadFile(
                    base64ToFile(
                        base64Data,
                        file.name,
                        extensionToDataURIHeader(file.type)
                    )
                );
    }

    public async list(): Promise<FileListResponseType> {
        return await FileService.call().listFile({})
    }

    public async retrieve(id: string): Promise<FileResponseType> {
        return await FileService.call().retrieveFile(id)
    }

    public async download(id: string): Promise<any> {
        return await FileService.call().getFileContent(id)
    }

    public async delete(id: string): Promise<any> {
        return await FileService.call().deleteFile(id)
    }

}
