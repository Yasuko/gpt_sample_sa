import {
    VectorBatchModel
} from '@/_domain/_model/vectorBatch.model'

export const newBatch = async (key: string, storeId: string, options: any) => {
    const model = VectorBatchModel.call(key)
    return await model.new(storeId, options)
}

export const listBatch = async (key: string, storeId: string, batchId: string) => {
    const model = VectorBatchModel.call(key)
    return await model.list(storeId, batchId)
}

export const retrieveBatch = async (key: string, storeId: string, batchId: string) => {
    const model = VectorBatchModel.call(key)
    return await model.retrieve(storeId, batchId)
}

