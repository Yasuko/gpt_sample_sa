import type {
    GenerateVideoOptions,
    EditVideoOptions,
    VideoItem,
} from '../../../_lib/gpt/helpers/video.helper'

/** 基本オプション型（生成）: リファレンス準拠（model, prompt, seconds?, size?） */
export type VideoOptions = GenerateVideoOptions

/** 生成用オプションの初期値 */
export const initialVideoOption: VideoOptions = {
    model: 'sora-2',
    prompt: '',
    seconds: undefined,
    size: undefined,
}

/** 編集オプション型 */
export type VideoEditOptionsEx = EditVideoOptions

/** 編集用オプションの初期値 */
export const initialVideoEditOption: VideoEditOptionsEx = {
    video_id: '',
    prompt: '',
    size: '720x1280'
}

/** リスト state 型 */
export type VideoListType = {
    items: VideoItem[]
}

/** リスト初期値 */
export const VideoListInitialState: VideoListType = {
    items: []
}

/** 進捗管理（id ごと） */
export type VideoProgressType = {
    byId: Record<string, { progress: number; status: VideoItem['status']; item?: VideoItem }>
}

/** 進捗初期値 */
export const VideoProgressInitialState: VideoProgressType = {
    byId: {}
}
