import React from 'react';
import { it } from 'vitest'
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ChatIndex from '../index';

// モックストアの作成
const mockStore = configureStore([]);
const store = mockStore({});

// コンポーネントの描画テスト
it('ChatIndexコンポーネントがエラーなく描画されるか', () => {
  render(
    <Provider store={store}>
      <ChatIndex />
    </Provider>
  );
});
