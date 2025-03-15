import { createSlice } from '@reduxjs/toolkit'
import { VisionFormType, initialVisionForm } from './__type.vision'

/**
 * Visionフォームのプロパティインターフェース
 * Visionフォームのオプションとディスパッチ関数を含むインターフェースを定義します。
 */
export interface VisionFormPropsInterface {
    VisionForm?: VisionFormInterface,
    dispatch?: any
}

/**
 * Visionフォームの詳細な型定義
 * Visionフォームに必要なプロパティを定義します。
 */
export type VisionFormInterface = VisionFormType & {
    message: string,
    temperature: number,
    max_tokens: number,
    image: string,
    result: string,
}

/**
 * Visionフォームの初期状態
 * フォームの初期値を設定します。
 */
export const initialState: VisionFormInterface = {
    ...initialVisionForm,
    message: '',
    temperature: 0.9,
    max_tokens: 1000,
    image: '',
    result: '',
}

/**
 * Visionフォームのスライス
 * Redux Toolkitを使用して、Visionフォームのリデューサーとアクションを定義します。
 */
const slice = createSlice({
    name: 'VisionForm',
    initialState,
    reducers: {
        /**
         * メッセージを設定する
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         */
        setMessage: (state: any, action: any) => {
            return Object.assign({}, state, {
                message: action.message
            })
        },
        /**
         * 温度を設定する
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         */
        setTemperature: (state: any, action: any) => {
            return Object.assign({}, state, {
                temperature: action.temperature
            })
        },
        /**
         * 最大トークン数を設定する
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         */
        setMaxTokens: (state: any, action: any) => {
            return Object.assign({}, state, {
                max_tokens: action.max_tokens
            })
        },
        /**
         * 画像を設定する
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         */
        setImage: (state: any, action: any) => {
            return Object.assign({}, state, {
                image: action.image
            })
        },
        /**
         * 結果を設定する
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         */
        setResult: (state: any, action: any) => {
            return Object.assign({}, state, {
                result: action.result
            })
        },
        /**
         * フォームをリセットする
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         */
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
})

export default slice.reducer
