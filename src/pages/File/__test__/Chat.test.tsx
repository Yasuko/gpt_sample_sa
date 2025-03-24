import React from 'react';
import { it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Chat from '../VectorStore';

// モックストアの作成
const mockStore = configureStore([]);
const store = mockStore({
  ChatForm: {
    newChat: '',
    chatBlock: [],
    options: {
      model: '',
      temperature: 0.5,
      top_p: 0.9,
      n: 1,
      stream: false,
      stop: '',
      max_tokens: 100,
      presence_penalty: 0,
      frequency_penalty: 0,
      logit_bias: 0,
    },
  },
});

// コンポーネントの描画テスト
it('Chatコンポーネントがエラーなく描画されるか', () => {
  render(
    <Provider store={store}>
      <Chat />
    </Provider>
  );
  expect(screen.getByText('Chat')).toBeInTheDocument();
});

// dispatchのテスト
it('Sendボタンがクリックされたときにdispatchが呼び出されるか', () => {
  render(
    <Provider store={store}>
      <Chat />
    </Provider>
  );
  fireEvent.click(screen.getByText('Send'));
  const actions = store.getActions();
  expect(actions).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ type: 'ChatAction/sendChat' }),
    ])
  );
});

// dispatchのテスト
it('Clearボタンがクリックされたときにdispatchが呼び出されるか', () => {
  render(
    <Provider store={store}>
      <Chat />
    </Provider>
  );
  fireEvent.click(screen.getByText('Clear'));
  const actions = store.getActions();
  expect(actions).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ type: 'ChatForm/reset' }),
    ])
  );
});
