import {
    VectorStoreListType,
    VectorStoreCreateType,
    VectorStoreDeleteType,
    VectorStoreModifyType,
    VectorStoreObjectType,
    VectorStoreRetrieveType,
    VectorStoreSearchType
} from '../../_lib/gpt/_helper/vector_store.helper'
import { VectorStoreService } from '../../_lib/gpt/vector_store.service'

export class VectorStoreModel {
    private static instance: VectorStoreModel

    public static call(key: string): VectorStoreModel {
        if (!VectorStoreModel.instance) {
            VectorStoreModel.instance = new VectorStoreModel(key)
        }
        return VectorStoreModel.instance
    }

    public constructor(key: string) {
        VectorStoreService.call().setAPIKey(key)
    }

    public async newStore(
        options: Partial<VectorStoreCreateType>
    ): Promise<VectorStoreObjectType> {
        await VectorStoreService.call().createStore(options)
        return VectorStoreService.call().getResult()
    }

    public async listStore(
        options: Partial<VectorStoreListType>
    ): Promise<VectorStoreObjectType> {
        await VectorStoreService.call().listStore(options)
        return VectorStoreService.call().getResult()
    }

    public async deleteStore(
        storeId: string
    ): Promise<VectorStoreObjectType> {
        await VectorStoreService.call().deleteStore(storeId)
        return VectorStoreService.call().getResult()
    }

}
