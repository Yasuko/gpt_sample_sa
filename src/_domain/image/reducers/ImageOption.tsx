import { createSlice } from '@reduxjs/toolkit';
import { ImageType, ImageInitialState } from './__type.image'

export interface ImageOptionPropsInterface {
    ImageOption?: ImageOptionInterface
    dispatch?   : any
}

export type ImageOptionInterface = ImageType
export const initialState: ImageOptionInterface = ImageInitialState

/**
 * ImageOption スライスを定義
 * 画像オプションの状態管理を行うための Redux スライス
 */
const slice = createSlice({
    name: 'ImageOption',
    initialState,
    reducers: {
        /**
         * モデルを設定する
         *
         * @param state any 現在の状態
         * @param action any モデル情報を含むアクションオブジェクト
         * @returns any 更新された状態
         */
        setModel: (state: any, action: any) => {
            return Object.assign({}, state, {
                model: action.model
            });
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
            });
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
            });
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
            });
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
            });
        },
        /**
         * スタイルを設定する
         *
         * @param state any 現在の状態
         * @param action any スタイル情報を含むアクションオブジェクト
         * @returns any 更新された状態
         */
        setStyle: (state: any, action: any) => {
            return Object.assign({}, state, {
                style: action.style
            });
        },
        /**
         * クオリティを設定する
         *
         * @param state any 現在の状態
         * @param action any クオリティ情報を含むアクションオブジェクト
         * @returns any 更新された状態
         */
        setQuality: (state: any, action: any) => {
            return Object.assign({}, state, {
                quality: action.quality
            });
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
