import {
    VectorStoreModel,
} from '@/_domain/_model/vectorStore.model'

export const newStore = async (key: string, options: any) => {
    const model = VectorStoreModel.call(key)
    return await model.new(options)
}

export const listStore = async (key: string, options: any) => {
    const model = VectorStoreModel.call(key)
    return await model.list(options)
}

export const retrieveStore = async (key: string, storeId: string) => {
    const model = VectorStoreModel.call(key)
    return await model.retrieve(storeId)
}

export const searchStore = async (key: string, storeId: string, options: any) => {
    const model = VectorStoreModel.call(key)
    return await model.search(storeId, options)
}

export const removeStore = async (key: string, storeId: string) => {
    const model = VectorStoreModel.call(key)
    return await model.remove(storeId)
}