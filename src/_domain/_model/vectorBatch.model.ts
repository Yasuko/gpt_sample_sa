import {
    CreateVectorStoreBatchType,
    initialVectorStoreBatchCreate,
    
    VectorStoreBatchObjectType,
    
} from '../../_lib/gpt/_helper/vector_store.helper'
import { VectorStoreService } from '../../_lib/gpt/vector_store.service'

export class VectorBatchModel {
    private static instance: VectorBatchModel

    public static call(key: string): VectorBatchModel {
        if (!VectorBatchModel.instance) {
            VectorBatchModel.instance = new VectorBatchModel(key)
        }
        return VectorBatchModel.instance
    }

    public constructor(key: string) {
        VectorStoreService.call().setAPIKey(key)
    }

    public async new(
        storeId: string,
        options: Partial<CreateVectorStoreBatchType>
    ): Promise<VectorStoreBatchObjectType> {
        const _options = Object.assign({}, initialVectorStoreBatchCreate, options)
        await VectorStoreService.call().createBatch(storeId, _options)
        return VectorStoreService.call().getResult()
    }

    public async list(
        storeId: string,
        batchId: string
    ): Promise<VectorStoreBatchObjectType> {
        await VectorStoreService.call().listBatch(storeId, batchId)
        return VectorStoreService.call().getResult()
    }

    public async retrieve(
        storeId: string,
        batchId: string
    ): Promise<VectorStoreBatchObjectType> {
        await VectorStoreService.call().retrieveBatch(storeId, batchId)
        return VectorStoreService.call().getResult()
    }

}
