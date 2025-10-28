import { createSlice } from '@reduxjs/toolkit'
import { duplicator, addArray } from '../../_helper/object.helper'
import { type VideoListType, VideoListInitialState } from './__type.video'

export interface VideoListPropsInterface {
    VideoList?: VideoListInterface
    dispatch?: any
}

export type VideoListInterface = VideoListType
export const initialState: VideoListInterface = VideoListInitialState

/**
 * VideoList スライス
 * - 生成/編集した VideoItem の一覧を管理します。
 * - set/add/update/delete を提供し、UI での表示や選択に利用します。
 */
const slice = createSlice({
    name: 'VideoList',
    initialState,
    reducers: {
        /** 一覧を丸ごと差し替え */
        setItems: (state: any, action: any) => ({ ...state, items: action.items }),
        /** 単一アイテムを末尾に追加 */
        addItem: (state: any, action: any) => ({ ...state, items: addArray(duplicator(state.items), action.item, initialState.items) }),
        /** 複数アイテムを末尾に追加 */
        addItems: (state: any, action: any) => ({ ...state, items: [...(state.items || []), ...(action.items || [])] }),
        /** 指定 ID のアイテムを更新 */
        updateItem: (state: any, action: any) => ({
            ...state,
            items: (state.items || []).map((it: any) => it.id === action.item.id ? { ...it, ...action.item } : it)
        }),
        /** 指定 ID のアイテムを削除 */
        deleteItem: (state: any, action: any) => ({
            ...state,
            items: (state.items || []).filter((it: any) => it.id !== action.id)
        }),
        /** 初期状態にリセット */
        reset: () => initialState,
    }
})

export default slice.reducer
