import { createSlice } from '@reduxjs/toolkit';
import { addArray, duplicator } from '../../_helper/object.helper';

/**
 * WhisperFormのプロパティインターフェース
 * WhisperFormのオプションとディスパッチ関数を含むインターフェースを定義します。
 */
export type WhisperFormPropsInterface = {
    WhisperForm?: WhisperFormInterface;
    dispatch?: any;
}

/**
 * Whisper APIのオプション型定義
 * Whisper APIに送信するオプションを定義します。
 */
export type WhisperOptions = {
    audio: any,
    model: 'tiny' | 'small' | 'basic' | 'large',
    prompt?: string,
    output_format?: 'txt' | 'json' | 'srt' | 'vtt' | 'verbose_json',
    temperature?: number,
    language?: string,
    fp16?: 'True' | 'False',
}

/**
 * 録音データの型定義
 * 録音データに必要なプロパティを定義します。
 */
export type RecordType = {
    rec         : any,
    time        : number,
    name        : string,
    text        : string,
    textType    : 'txt' | 'json' | 'srt' | 'vtt' | 'verbose_json',
    formation   : string,
    summary     : string,
    extension   : string,
}

/**
 * 録音データの初期値
 */
export const initialRecorder: RecordType = {
    rec         : null,
    time        : 0,
    name        : '',
    text        : '',
    formation   : '',
    summary     : '',
    textType    : 'txt',
    extension   : '',
}

/**
 * WhisperFormの型定義
 * WhisperFormに必要なプロパティを定義します。
 */
export type WhisperFormInterface = {
    text        : string
    formation   : string
    summary     : string
    spell       : {[key: string]: string}
    options     : WhisperOptions
    recorder    : RecordType[]
    recAudio    : boolean
    recVideo    : boolean
}

/**
 * WhisperFormの初期状態
 * 初期値を設定します。
 */
export const initialState: WhisperFormInterface = {
    text        :  '',
    formation   :  '',
    summary     :  '',
    spell       : {
        formation: '　\n この文書は、音声を文字起こしした内容で、誤字や脱字、言葉の意味がおかしな所があります。\n'
                    + 'また、文章の順番がおかしい場合があります。こういった箇所を修正し、読みやすい内容に整えて下さい',
        summary: '　\n この文書を、400字程度で箇条書きに整理して',
    },
    options     : {
        audio: '',
        model: 'tiny',
        prompt: '',
        output_format: 'txt',
        temperature: 0.5,
        language: 'ja',
        fp16: 'False',
    },
    recorder    : [],
    recAudio    : false,
    recVideo    : false,
};

/**
 * WhisperFormのスライス
 * Redux Toolkitを使用して、WhisperFormのリデューサーとアクションを定義します。
 */
const slice = createSlice({
    name: 'WhisperForm',
    initialState,
    reducers: {
        /**
         * テキストを設定する
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         */
        setText: (state: any, action: any) => {
            const re = duplicator(state.recorder)
            re[action.key].text = action.text

            return Object.assign({}, state, {
                recorder: re
            })
        },
        /**
         * 整形データを設定する
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         */
        setFormation: (state: any, action: any) => {
            const re = duplicator(state.recorder)
            re[action.key].formation = action.formation

            return Object.assign({}, state, {
                recorder: re
            })
        },
        /**
         * 要約データを設定する
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         */
        setSummary: (state: any, action: any) => {
            const re = duplicator(state.recorder)
            re[action.key].summary = action.summary

            return Object.assign({}, state, {
                recorder: re
            })
        },
        /**
         * 録音データを設定する
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         */
        setRecorder: (state: any, action: any) => {
            return Object.assign({}, state, {
                recorder: action.recorder
            })
        },
        /**
         * 録音データを追加する
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         */
        addRecorder: (state: any, action: any) => {
            console.log(action)
            const re = duplicator(state.recorder)
            return Object.assign({}, state, {
                recorder: addArray(re, action.recorder, initialState.recorder)
            })
        },
        /**
         * オプションを更新する
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         */
        updateOption: (state: any, action: any) => {
            const re = duplicator(state.options)
            re[action.key] = action.option
            return Object.assign({}, state.options, {
                options: re
            })
        },
        /**
         * 録音フラグを設定する
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         */
        setAudioFlag: (state: any, action: any) => {
            return Object.assign({}, state, {
                recAudio: action.recAudio
            })
        },
        /**
         * 録画フラグを設定する
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         */
        setVideoFlag: (state: any, action: any) => {
            return Object.assign({}, state, {
                recVideo: action.recVideo
            })
        },
        /**
         * 状態をリセットする
         * 初期状態に戻します。
         * @param state any 現在の状態
         * @param action any アクションオブジェクト
         */
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
})

export default slice.reducer
