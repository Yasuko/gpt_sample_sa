import VectorStore from "./reducers/VectorStore"
import VectorFile from "./reducers/VectorFile"
import VectorBatch from "./reducers/VectorBatch"

/**
 * ChatReducerオブジェクト。
 * 各リデューサーをまとめてエクスポートします。
 *
 * @property ChatForm - ChatFormリデューサー。
 */
export const VectorStoreReducer = {
    VectorStore,
    VectorFile,
    VectorBatch
}
