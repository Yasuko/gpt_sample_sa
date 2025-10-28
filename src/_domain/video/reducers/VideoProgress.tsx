import { createSlice } from '@reduxjs/toolkit'
import { type VideoProgressType, VideoProgressInitialState } from './__type.video'

export interface VideoProgressPropsInterface {
    VideoProgress?: VideoProgressInterface
    dispatch?: any
}

export type VideoProgressInterface = VideoProgressType
export const initialState: VideoProgressInterface = VideoProgressInitialState

/**
 * VideoProgress スライス
 * - ジョブ ID ごとの進捗（%）と状態を保持します。
 * - ポーリングや SSE などの更新により upsert され、完了で clear されます。
 */
const slice = createSlice({
    name: 'VideoProgress',
    initialState,
    reducers: {
        /** 指定 ID の進捗/状態を登録または更新 */
        upsert: (state: any, action: any) => ({
            ...state,
            byId: {
                ...(state.byId || {}),
                [action.id]: {
                    progress: action.progress,
                    status: action.status,
                    item: action.item,
                }
            }
        }),
        /** 指定 ID の進捗を削除 */
        clear: (state: any, action: any) => {
            const next = { ...(state.byId || {}) }
            delete next[action.id]
            return { ...state, byId: next }
        },
        /** 初期状態にリセット */
        reset: () => initialState,
    }
})

export default slice.reducer
