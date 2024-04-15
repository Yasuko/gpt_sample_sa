import { createSlice } from '@reduxjs/toolkit';

export type TokenFormPropsInterface = {
    TokenForm?: TokenFormInterface
    dispatch?: any
}

export type TokenFormInterface = {
    token: string
    initial: boolean
    return: string
}

export const initialState: TokenFormInterface = {
    token: '',
    initial: false,
    return: ''
}

const slice = createSlice({
    name: 'TokenForm',
    initialState,
    reducers: {
        setToken: (state: any, action: any) => {
            return Object.assign({}, state, {
                token: action.token,
                initial: true
            });
        },
        setReturn: (state: any, action: any) => {
            return Object.assign({}, state, {
                return: action.return
            });
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
})

export default slice.reducer
