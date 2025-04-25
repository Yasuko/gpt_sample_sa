import React from 'react';
import { it, expect } from 'vitest'
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Option from '../Option';

// モックストアの作成
const mockStore = configureStore([]);
const store = mockStore({
  ChatForm: {
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
it('Optionコンポーネントがエラーなく描画されるか', () => {
  render(
    <Provider store={store}>
      <Option />
    </Provider>
  );
  expect(screen.getByText('temperature [0.5]:')).toBeInTheDocument();
});

// dispatchのテスト
it('temperatureのスライダーが変更されたときにdispatchが呼び出されるか', () => {
  render(
    <Provider store={store}>
      <Option />
    </Provider>
  );
  fireEvent.change(screen.getByRole('slider', { name: /temperature/i }), { target: { value: 1.0 } });
  const actions = store.getActions();
  expect(actions).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ type: 'ChatForm/setOptions', key: 'temperature', option: 1.0 }),
    ])
  );
});
