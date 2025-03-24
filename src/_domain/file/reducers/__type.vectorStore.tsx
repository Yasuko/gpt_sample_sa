import { 
    VectorStoreObjectType,
    VectorStoreCreateType,

    VectorStoreFileObjectType,
    CreateVectorStoreFileType,
    VectorStoreBatchObjectType,
    CreateVectorStoreBatchType,
} from '../../../_lib/gpt/_helper/vector_store.helper'

import {
    UploadFileType,
    FileResponseType,
} from '../../../_lib/gpt/_helper/file.helper'

export type FileType = FileResponseType
export const initialFile: FileType = {
    id: '',
    object: "file",
    bytes: 0,
    created_at: 0,
    expires_at: 0,
    filename: '',
    purpose: 'user_data',
}

export type FileFormType = UploadFileType
export const initialFileForm: FileFormType = {
    file: null,
    purpose: 'user_data',
}

export type VectorStoreType = VectorStoreObjectType
export const initialVectorStore: VectorStoreType = {
    created_at: 0,
    expires_after: {
        anchor: '',
        days: 0,
    },
    expires_at: 0,
    file_counts: {
        cancelled: 0,
        completed: 0,
        failed: 0,
        in_progress: 0,
        total: 0
    },
    id: '',
    last_active_at: 0,
    metadata: { },
    name: '',
    usage_bytes: 0
}

export type VectorStoreFormType = VectorStoreCreateType
export const initialVectorStoreForm: VectorStoreFormType = {
    name: '',
}


export type VectorFileType = VectorStoreFileObjectType
export const initialVectorStoreFile: VectorFileType = {
    attributes: {},
    chunk_strategy: {type: 'other'},
    created_at: 0,
    id: '',
    last_error: null,
    metadata: {},
    object: '',
    status: "cancelled",
    usage_bytes: 0,
    vector_store_id: ''
}

export type VectorFileFormType = CreateVectorStoreFileType
export const initialVectorFileForm: VectorFileFormType = {
    attributes: {},
    chunk_strategy: {type: 'auto'},
    file_id: ''
}



export type VectorBatchType = VectorStoreBatchObjectType
export const initialVectorStoreBatch: VectorBatchType = {
    created_at: 0,
    file_contents: {
        cancelled: 0,
        completed: 0,
        failed: 0,
        in_progress: 0,
        total: 0
    },
    id: '',
    object: '',
    status: "cancelled",
    vector_store_id: ''
}

export type VectorBatchFormType = CreateVectorStoreBatchType
export const initialVectorBatchForm: VectorBatchFormType = {
    file_ids: []
}