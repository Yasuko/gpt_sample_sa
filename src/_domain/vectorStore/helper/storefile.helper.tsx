import {
    VectorFileModel
} from '@/_domain/_model/vectorFile.model'

export const newFile = async (key: string, storeId: string, options: any) => {
    const model = VectorFileModel.call(key)
    return await model.new(storeId, options)
}

export const listFile = async (key: string, storeId: string, options: any) => {
    const model = VectorFileModel.call(key)
    return await model.list(storeId, options)
}

export const removeFile = async (key: string, storeId: string) => {
    const model = VectorFileModel.call(key)
    return await model.remove(storeId)
}