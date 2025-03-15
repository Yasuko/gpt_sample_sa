import { createSlice } from '@reduxjs/toolkit';
import { ImageChangeType, ImageChangeInitialState } from './__type.image'

export interface ImageChangeOptionPropsInterface {
    ImageChangeOption?: ImageChangeOptionInterface
    dispatch?   : any
}

export type ImageChangeOptionInterface = ImageChangeType
export const initialState: ImageChangeOptionInterface = ImageChangeInitialState

/**
 * ImageChangeOption スライスを定義
 * 画像変更オプションの状態管理を行うための Redux スライス
 */
const slice = createSlice({
    name: 'ImageChangeOption',
    initialState,
    reducers: {
        /**
         * 画像を設定する
         *
         * @param state any 現在の状態
         * @param action any 画像データを含むアクションオブジェクト
         * @returns any 更新された状態
         */
        setImage: (state: any, action: any) => {
            return Object.assign({}, state, {
                image: action.image
            })
        },
        /**
         * Base64形式の画像を設定する
         *
         * @param state any 現在の状態
         * @param action any Base64形式の画像データを含むアクションオブジェクト
         * @returns any 更新された状態
         */
        setImageBase64: (state: any, action: any) => {
            return Object.assign({}, state, {
                image_base64: action.image_base64
            })
        },
        /**
         * プロンプトを設定する
         *
         * @param state any 現在の状態
         * @param action any プロンプト情報を含むアクションオブジェクト
         * @returns any 更新された状態
         */
        setPrompt: (state: any, action: any) => {
            return Object.assign({}, state, {
                prompt: action.prompt
            })
        },
        /**
         * モデルを設定する
         *
         * @param state any 現在の状態
         * @param action any モデル情報を含むアクションオブジェクト
         * @returns any 更新された状態
         */
        setModel: (state: any, action: any) => {
            return Object.assign({}, state, {
                prompt: action.prompt
            })
        },
        /**
         * n 値を設定する
         *
         * @param state any 現在の状態
         * @param action any n 値を含むアクションオブジェクト
         * @returns any 更新された状態
         */
        setN: (state: any, action: any) => {
            return Object.assign({}, state, {
                n: action.n
            })
        },
        /**
         * サイズを設定する
         *
         * @param state any 現在の状態
         * @param action any サイズ情報を含むアクションオブジェクト
         * @returns any 更新された状態
         */
        setSize: (state: any, action: any) => {
            return Object.assign({}, state, {
                size: action.size
            })
        },
        /**
         * レスポンスフォーマットを設定する
         *
         * @param state any 現在の状態
         * @param action any レスポンスフォーマット情報を含むアクションオブジェクト
         * @returns any 更新された状態
         */
        setResponseFormat: (state: any, action: any) => {
            return Object.assign({}, state, {
                responseFormat: action.responseFormat
            })
        },
        /**
         * 状態を初期状態にリセットする
         *
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         * @returns any 初期状態
         */
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
})

export default slice.reducer
