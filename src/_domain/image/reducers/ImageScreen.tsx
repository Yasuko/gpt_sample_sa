import { createSlice } from '@reduxjs/toolkit'
import { ImageScreenType, ImageScreenInitialState } from './__type.image'

export interface ImageScreenPropsInterface {
    ImageScreen?: ImageScreenInterface
    dispatch?   : any
}

export type ImageScreenInterface = ImageScreenType
export const initialState: ImageScreenInterface = ImageScreenInitialState

/**
 * ImageScreen スライスを定義
 * 画像画面の状態管理を行うための Redux スライス
 */
const slice = createSlice({
    name: 'ImageScreen',
    initialState,
    reducers: {
        /**
         * ベース画面を表示する
         * base を true に設定し、edit と change を false にする
         *
         * @param state ImageScreenInterface 現在の状態
         * @param action any アクションオブジェクト
         * @returns ImageScreenInterface 更新された状態
         */
        showBase: (state: ImageScreenInterface, action: any) => {
            return Object.assign({}, state, {
                base    : true,
                edit    : false,
                change  : false
            })
        },
        /**
         * 編集画面を表示する
         * edit を true に設定し、base と change を false にする
         *
         * @param state ImageScreenInterface 現在の状態
         * @param action any アクションオブジェクト
         * @returns ImageScreenInterface 更新された状態
         */
        showEdit: (state: ImageScreenInterface, action: any) => {
            return Object.assign({}, state, {
                base    : false,
                edit    : true,
                change  : false
            })
        },
        /**
         * 変更画面を表示する
         * change を true に設定し、base と edit を false にする
         *
         * @param state ImageScreenInterface 現在の状態
         * @param action any アクションオブジェクト
         * @returns ImageScreenInterface 更新された状態
         */
        showChange: (state: ImageScreenInterface, action: any) => {
            return Object.assign({}, state, {
                base    : false,
                edit    : false,
                change  : true
            })
        },
        /**
         * サブ画面を設定する
         * subscreen プロパティを更新する
         *
         * @param state ImageScreenInterface 現在の状態
         * @param action any subscreen を含むアクションオブジェクト
         * @returns ImageScreenInterface 更新された状態
         */
        setSubScreen: (state: ImageScreenInterface, action: any) => {
            return Object.assign({}, state, {
                subscreen: action.subscreen
            })
        },
        /**
         * 状態を初期状態にリセットする
         *
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         * @returns ImageScreenInterface 初期状態
         */
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
})

export default slice.reducer
