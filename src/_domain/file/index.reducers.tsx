import FileScreen from "./reducers/FileScreen"
import Files from "./reducers/Files"
import FileForm from "./reducers/FileForm"
import FileShow from "./reducers/FileShow"

/**
 * ChatReducerオブジェクト。
 * 各リデューサーをまとめてエクスポートします。
 *
 * @property ChatForm - ChatFormリデューサー。
 */
export const FileReducer = {
    FileScreen,
    Files,
    FileForm,
    FileShow,
}
