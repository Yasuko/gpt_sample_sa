import { createSlice } from '@reduxjs/toolkit';
import { duplicator, addArray } from '../../_helper/object.helper'
import { ImageListType, ImageListInitialState } from './__type.image'

export interface ImageListPropsInterface {
    ImageList?: ImageListInterface
    dispatch?: any
}

export type ImageListInterface = ImageListType
export const initialState: ImageListInterface = ImageListInitialState

/**
 * ImageList スライスを定義
 * 画像リストの状態管理を行うための Redux スライス
 */
const slice = createSlice({
    name: 'ImageList',
    initialState,
    reducers: {
        /**
         * 画像リストを設定する
         *
         * @param state any 現在の状態
         * @param action any 画像リストを含むアクションオブジェクト
         * @returns any 更新された状態
         */
        setImages: (state: any, action: any) => {
            return Object.assign({}, state, {
                images: action.images
            });
        },
        /**
         * 画像リストに画像を追加する
         *
         * @param state any 現在の状態
         * @param action any 追加する画像を含むアクションオブジェクト
         * @returns any 更新された状態
         */
        addImages: (state: any, action: any) => {
            const cb = duplicator(state.images)
            return Object.assign({}, state, {
                images: addArray(cb, action.images, initialState.images)
            });
        },
        /**
         * 画像リストから画像を削除する
         *
         * @param state any 現在の状態
         * @param action any 削除する画像のキーを含むアクションオブジェクト
         * @returns any 更新された状態
         */
        deleteImages: (state: any, action: any) => {
            const cb = duplicator(state.images)
            cb.splice(action.key, 1)
            return Object.assign({}, state, {
                images: cb
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
