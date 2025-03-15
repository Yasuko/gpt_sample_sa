import {
    CreateVectorStoreFileType,
    ListVectorStoreFileType,
    UpdateVectorStoreFileType,
    
    VectorStoreFileObjectType
} from '../../_lib/gpt/_helper/vector_store.helper'
import { VectorStoreService } from '../../_lib/gpt/vector_store.service'

export class VectorFileModel {
    private static instance: VectorFileModel

    public static call(key: string): VectorFileModel {
        if (!VectorFileModel.instance) {
            VectorFileModel.instance = new VectorFileModel(key)
        }
        return VectorFileModel.instance
    }

    public constructor(key: string) {
        VectorStoreService.call().setAPIKey(key)
    }

    public async new(
        storeId: string,
        options: Partial<CreateVectorStoreFileType>
    ): Promise<VectorStoreFileObjectType> {
        await VectorStoreService.call().createFile(storeId, options)
        return VectorStoreService.call().getResult()
    }

    public async list(
        storeId: string,
        options: Partial<ListVectorStoreFileType>
    ): Promise<VectorStoreFileObjectType> {
        await VectorStoreService.call().listFile(storeId, options)
        return VectorStoreService.call().getResult()
    }

    public async remove(
        storeId: string
    ): Promise<VectorStoreObjectType> {
        await VectorStoreService.call().deleteStore(storeId)
        return VectorStoreService.call().getResult()
    }

}
