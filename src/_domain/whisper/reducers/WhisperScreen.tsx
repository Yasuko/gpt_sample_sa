import { createSlice } from '@reduxjs/toolkit'
import {
    WhisperScreenType, WhisperScreenInitialState
} from './type.Wisper'

/**
 * WhisperScreenのプロパティインターフェース
 * WhisperScreenのオプションとディスパッチ関数を含むインターフェースを定義します。
 */
export interface WhisperScreenPropsInterface {
    WhisperScreen?: WhisperScreenType
    dispatch?: any
}

/**
 * WhisperScreenの型定義
 * WhisperScreenに必要なプロパティを定義します。
 */
export type WhisperScreenInterface = WhisperScreenType

/**
 * WhisperScreenの初期状態
 * 初期値を設定します。
 */
export const initialState: WhisperScreenInterface = WhisperScreenInitialState

/**
 * WhisperScreenのスライス
 * Redux Toolkitを使用して、WhisperScreenのリデューサーとアクションを定義します。
 */
const slice = createSlice({
    name: 'WhisperScreen',
    initialState,
    reducers: {
        /**
         * テキスト表示の切り替え
         * 現在の状態に基づいて、テキスト表示を切り替えます。
         *
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         */
        toggleShowText: (state: any, action: any) => {
            return Object.assign({}, state, {
                showText: (state.showText)? false: true
            })
        },
        /**
         * 状態をリセットする
         * 初期状態に戻します。
         *
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         */
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
})

export default slice.reducer
