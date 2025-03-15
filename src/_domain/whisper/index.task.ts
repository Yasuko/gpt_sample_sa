import { RootVideoAction } from './video.action'
import { RootAudioAction } from './audio.action'
import { RootWhisperAction } from './whisper.action'

/**
 * Whisperドメインのルートタスク配列
 * Video、Audio、Whisperに関連するすべてのアクションを結合してエクスポートします。
 */
export const RootWhisperDomain = [
    ...RootVideoAction,
    ...RootAudioAction,
    ...RootWhisperAction
]
