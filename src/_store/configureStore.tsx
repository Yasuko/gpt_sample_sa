import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './index.reducers';
import createSagaMiddleware from 'redux-saga';
//import loggerMiddleware from 'redux-logger';
import rootSaga from './index_task';

export const createStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        reducer,
        // middleware: [sagaMiddleware, loggerMiddleware]
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(
            {
                serializableCheck: {
                    // 巨大なstateを持つ場合は、以下の配列に無視したいactionを追加する
                    ignoredActions: [],
                    ignoredActionPaths: [],
                    ignoredPaths: [
                        'ImageEditOption.image',
                        'ImageEditOption.mask',
                        'ImageChangeOption.image',
                    ]
                }
            }
        ).concat(sagaMiddleware)
    });
    sagaMiddleware.run(rootSaga);
    return store;
};
