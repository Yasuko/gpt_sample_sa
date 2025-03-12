import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    getTokenResult, getTokenResultHistory,
    setTokenResult, clearTokenResult,
    TokenResultType, initialTokenResult
} from '../../../_lib/gpt/token.service'
import { duplicator } from '../../_helper/object.helper';

export type TokenPropsInterface = {
    Token?: TokenInterface;
    dispatch?: any;
}

export type TokenInterface = {
    result: TokenResultType,
    history: TokenResultType[],
    show: boolean
}

export const initialState: TokenInterface = {
    result: initialTokenResult,
    history: [],
    show: false
}

const slice = createSlice({
    name: 'Token',
    initialState,
    reducers: {
        setResult: (
            state: TokenInterface,
            action: PayloadAction<TokenResultType>
        ) => {
            return Object.assign({}, state, {
                result: action.payload
            });
        },
        setHistory: (
            state: TokenInterface,
            action: PayloadAction<TokenResultType>
        ) => {
            setTokenResult(action.payload)
            console.log('setHistory', getTokenResultHistory())
            return Object.assign({}, state, {
                history: getTokenResultHistory(),
                result: getTokenResult()
            })
        },
        clearResult: (state: TokenInterface, action: any) => {
            clearTokenResult()
            return initialState;
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;
