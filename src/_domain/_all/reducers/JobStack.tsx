import { createSlice } from '@reduxjs/toolkit';


export interface JobStackPropsInterface {
    JobStack?: JobStackInterface;
    dispatch?: any;
}

export type Jobs = {
    job         : string,
    dispatch    : string,
    key         : string,
}

export interface JobStackInterface {
    jobs        : Jobs[] | [];
    wait        : boolean;
}

export const initialState: JobStackInterface = {
    jobs        : [],
    wait        : false
};

const slice = createSlice({
    name: 'JobStack',
    initialState,
    reducers: {
        setJobStack: (state: any, action: any) => {
            return Object.assign({}, state, {
                jobs: action.jobs
            });
        },
        setWait: (state: any, action: any) => {
            return Object.assign({}, state, {
                wait: action.wait
            });
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;
