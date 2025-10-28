import { createSlice } from '@reduxjs/toolkit'
import { initialVideoOption, type VideoOptions } from './__type.video'

export interface VideoOptionPropsInterface {
  VideoOption?: VideoOptionInterface
  dispatch?: any
}

export type VideoOptionInterface = VideoOptions
export const initialState: VideoOptionInterface = initialVideoOption

/**
 * VideoOption スライス
 * - 動画生成に使用する入力（model/prompt/seconds/size/input_reference）を管理します。
 */
const slice = createSlice({
  name: 'VideoOption',
  initialState,
  reducers: {
    /** モデル名を設定 */
    setModel: (state: any, action: any) => ({ ...state, model: action.model }),
    /** 生成プロンプトを設定 */
    setPrompt: (state: any, action: any) => ({ ...state, prompt: action.prompt }),
    /** 秒数（seconds）を設定 */
    setSeconds: (state: any, action: any) => ({ ...state, seconds: action.seconds }),
    /** サイズ（例: 1280x720）を設定 */
    setSize: (state: any, action: any) => ({ ...state, size: action.size }),
    /** 入力参照（input_reference: File/Blob 等）を設定 */
    setInputReference: (state: any, action: any) => ({ ...state, input_reference: action.input_reference }),
    /** 初期状態へリセット */
    reset: () => initialState,
  }
})

export default slice.reducer

