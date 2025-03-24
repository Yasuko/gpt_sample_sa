import VectorStoreScreen from "./reducers/FileScreen"
import Files from "./reducers/Files"
import FileForm from "./reducers/FileForm"
import FileEdit from "./reducers/FileEdit"

/**
 * ChatReducerオブジェクト。
 * 各リデューサーをまとめてエクスポートします。
 *
 * @property ChatForm - ChatFormリデューサー。
 */
export const FileReducer = {
    VectorStoreScreen,
    Files,
    FileForm,
    FileEdit,
}
