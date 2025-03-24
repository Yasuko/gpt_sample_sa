import VectorStore from "./reducers/VectorStore"
import VectorStoreForm from "./reducers/VectorStoreForm"
import VectorStoreEdit from "./reducers/VectorStoreEdit"
import VectorFile from "./reducers/VectorFile"
import VectorFileForm from "./reducers/VectorFileForm"
import VectorFileEdit from "./reducers/VectorFileEdit"
import VectorBatch from "./reducers/VectorBatch"
import VectorBatchForm from "./reducers/VectorBatchForm"
import VectorBatchEdit from "./reducers/VectorBatchEdit"
import VectorStoreScreen from "./reducers/VectorStoreScreen"


/**
 * ChatReducerオブジェクト。
 * 各リデューサーをまとめてエクスポートします。
 *
 * @property ChatForm - ChatFormリデューサー。
 */
export const VectorStoreReducer = {
    VectorStore,
    VectorStoreForm,
    VectorStoreEdit,
    VectorFile,
    VectorFileForm,
    VectorFileEdit,
    VectorBatch,
    VectorBatchForm,
    VectorBatchEdit,
    VectorStoreScreen,
}
