import { createSlice } from '@reduxjs/toolkit';

export type WhisperShowTextPropsInterface = {
    WhisperShowText?: WhisperShowTextInterface;
    dispatch?: any;
}

export type WhisperShowTextInterface = {
    key         : number;
    text        : string;
    formation   : string;
    summary     : string;
}

export const initialState: WhisperShowTextInterface = {
    key         :  0,
    text        :  '',
    formation   :  '',
    summary     :  '',
};

const slice = createSlice({
    name: 'WhisperShowText',
    initialState,
    reducers: {
        set: (state: any, action: any) => {
            return Object.assign({}, state, {
                key: action.key,
                text: action.text,
                formation: action.formation,
                summary: action.summary
            });
        },
        setKey: (state: any, action: any) => {
            return Object.assign({}, state, {
                key: action.key
            });
        },
        setText: (state: any, action: any) => {
            return Object.assign({}, state, {
                text: action.text
            });
        },
        setFormation: (state: any, action: any) => {
            return Object.assign({}, state, {
                formation: action.formation
            });
        },
        setSummary: (state: any, action: any) => {
            return Object.assign({}, state, {
                summary: action.summary
            });
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;
