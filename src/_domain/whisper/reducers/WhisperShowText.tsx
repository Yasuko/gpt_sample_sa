import { createSlice } from '@reduxjs/toolkit';

/**
 * WhisperShowTextのプロパティインターフェース
 * WhisperShowTextのオプションとディスパッチ関数を含むインターフェースを定義します。
 */
export type WhisperShowTextPropsInterface = {
    WhisperShowText?: WhisperShowTextInterface;
    dispatch?: any;
}

/**
 * WhisperShowTextの詳細な型定義
 * WhisperShowTextに必要なプロパティを定義します。
 */
export type WhisperShowTextInterface = {
    key         : number;
    text        : string;
    formation   : string;
    summary     : string;
}

/**
 * WhisperShowTextの初期状態
 * 初期値を設定します。
 */
export const initialState: WhisperShowTextInterface = {
    key         :  0,
    text        :  '',
    formation   :  '',
    summary     :  '',
};

/**
 * WhisperShowTextのスライス
 * Redux Toolkitを使用して、WhisperShowTextのリデューサーとアクションを定義します。
 */
const slice = createSlice({
    name: 'WhisperShowText',
    initialState,
    reducers: {
        /**
         * WhisperShowTextの全データを設定する
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         */
        set: (state: any, action: any) => {
            return Object.assign({}, state, {
                key: action.key,
                text: action.text,
                formation: action.formation,
                summary: action.summary
            });
        },
        /**
         * キーを設定する
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         */
        setKey: (state: any, action: any) => {
            return Object.assign({}, state, {
                key: action.key
            });
        },
        /**
         * テキストを設定する
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         */
        setText: (state: any, action: any) => {
            return Object.assign({}, state, {
                text: action.text
            });
        },
        /**
         * 整形データを設定する
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         */
        setFormation: (state: any, action: any) => {
            return Object.assign({}, state, {
                formation: action.formation
            });
        },
        /**
         * 要約データを設定する
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         */
        setSummary: (state: any, action: any) => {
            return Object.assign({}, state, {
                summary: action.summary
            });
        },
        /**
         * 状態をリセットする
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         */
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;
