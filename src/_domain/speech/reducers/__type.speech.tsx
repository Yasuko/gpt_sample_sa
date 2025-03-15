import {
    TextToSpeechOptions,
    initialTextToSpeechOptions,
} from '../../../_lib/gpt/type.service'

/**
 * スピーチフォームの型とその初期状態を定義します。
 *
 * @typedef SpeechFormType スピーチフォームオプションの型。
 * @constant initialSpeechForm スピーチフォームの初期状態。
 */
export type SpeechFormType = TextToSpeechOptions
export const initialSpeechForm: SpeechFormType = initialTextToSpeechOptions
