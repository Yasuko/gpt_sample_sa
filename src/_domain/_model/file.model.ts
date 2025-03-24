import {
    UploadFileType, ListFileType,
    RetrieveFileContentType, RetrieveFileType,
    DeleteFileType,
    FileListResponseType, FileResponseType
} from '../../_lib/gpt/_helper/file.helper'
import { FileService } from '../../_lib/gpt/file.service'

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

    public async upload(file: File): Promise<any> {
        return await FileService.call().uploadFile(file)
    }

    public async list(): Promise<FileListResponseType> {
        return await FileService.call().listFile({})
    }

    public async retrieve(id: string): Promise<FileResponseType> {
        return await FileService.call().retrieveFile(id)
    }

    public async delete(id: string): Promise<any> {
        return await FileService.call().deleteFile(id)
    }

}
