import { createSlice } from '@reduxjs/toolkit'
import { initialVideoEditOption, type VideoEditOptionsEx } from './__type.video'

export interface VideoEditOptionPropsInterface {
    VideoEditOption?: VideoEditOptionInterface
    dispatch?: any
}

export type VideoEditOptionInterface = VideoEditOptionsEx
export const initialState: VideoEditOptionInterface = initialVideoEditOption

/**
 * VideoEditOption スライス
 * - 動画のリミックスに使用する入力（video_id/prompt）を管理します。
 */
const slice = createSlice({
    name: 'VideoEditOption',
    initialState,
    reducers: {
        /** リミックス対象の video_id を設定 */
        setVideoId: (state: any, action: any) => ({ ...state, video_id: action.video_id }),
        /** リミックス用プロンプトを設定 */
        setPrompt: (state: any, action: any) => ({ ...state, prompt: action.prompt }),
        /** 初期状態へリセット */
        reset: () => initialState,
    }
})

export default slice.reducer
