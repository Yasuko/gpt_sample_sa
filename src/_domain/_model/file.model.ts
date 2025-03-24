import {

} from '../../_lib/gpt/_helper/file.helper'
import { VectorStoreService } from '../../_lib/gpt/vector_store.service'

export class FileModel {
    private static instance: FileModel

    public static call(key: string): FileModel {
        if (!FileModel.instance) {
            FileModel.instance = new FileModel(key)
        }
        return FileModel.instance
    }

    public constructor(key: string) {
        VectorStoreService.call().setAPIKey(key)
    }


}
