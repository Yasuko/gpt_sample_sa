import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Option from '../Option'

const mockStore = configureStore([])

describe('Option Component', () => {
  let store: any

  beforeEach(() => {
    store = mockStore({
      ImageOption: {
        prompt: '',
        model: 'dall-e-3',
        size: '1024x1024',
        style: 'vivid',
        response_format: 'url',
        quality: 'standard',
        n: 1
      }
    })
    store.dispatch = vi.fn()
  })

  it('コンポーネントが正しく描画される', () => {
    render(
      <Provider store={store}>
        <Option />
      </Provider>
    )

    expect(screen.getByTestId('option-component')).toBeInTheDocument()
    expect(screen.getByTestId('prompt-input')).toBeInTheDocument()
    expect(screen.getByTestId('send-button')).toBeInTheDocument()
    expect(screen.getByTestId('model-select')).toBeInTheDocument()
    expect(screen.getByTestId('size-select')).toBeInTheDocument()
    expect(screen.getByTestId('style-select')).toBeInTheDocument()
    expect(screen.getByTestId('response-format-select')).toBeInTheDocument()
    expect(screen.getByTestId('quality-select')).toBeInTheDocument()
    expect(screen.getByTestId('n-input')).toBeInTheDocument()
  })

  it('プロンプト入力時に正しいdispatchが呼ばれる', () => {
    render(
      <Provider store={store}>
        <Option />
      </Provider>
    )

    fireEvent.change(screen.getByTestId('prompt-input'), {
      target: { value: 'test prompt' }
    })

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'ImageOption/setPrompt',
      prompt: 'test prompt'
    })
  })

  it('モデル選択時に正しいdispatchが呼ばれる', () => {
    render(
      <Provider store={store}>
        <Option />
      </Provider>
    )

    fireEvent.change(screen.getByTestId('model-select'), {
      target: { value: 'dall-e-2' }
    })

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'ImageOption/setModel',
      model: 'dall-e-2'
    })
  })

  it('サイズ選択時に正しいdispatchが呼ばれる', () => {
    render(
      <Provider store={store}>
        <Option />
      </Provider>
    )

    fireEvent.change(screen.getByTestId('size-select'), {
      target: { value: '512x512' }
    })

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'ImageOption/setSize',
      size: '512x512'
    })
  })

  it('スタイル選択時に正しいdispatchが呼ばれる', () => {
    render(
      <Provider store={store}>
        <Option />
      </Provider>
    )

    fireEvent.change(screen.getByTestId('style-select'), {
      target: { value: 'natural' }
    })

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'ImageOption/setStyle',
      style: 'natural'
    })
  })

  it('レスポンスフォーマット選択時に正しいdispatchが呼ばれる', () => {
    render(
      <Provider store={store}>
        <Option />
      </Provider>
    )

    fireEvent.change(screen.getByTestId('response-format-select'), {
      target: { value: 'b64_json' }
    })

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'ImageOption/setResponseFormat',
      responseFormat: 'b64_json'
    })
  })

  it('品質選択時に正しいdispatchが呼ばれる', () => {
    render(
      <Provider store={store}>
        <Option />
      </Provider>
    )

    fireEvent.change(screen.getByTestId('quality-select'), {
      target: { value: 'hq' }
    })

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'ImageOption/setQuality',
      quality: 'hq'
    })
  })

  it('n値変更時に正しいdispatchが呼ばれる', () => {
    render(
      <Provider store={store}>
        <Option />
      </Provider>
    )

    fireEvent.change(screen.getByTestId('n-input'), {
      target: { value: '2' }
    })

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'ImageOption/setN',
      n: 2
    })
  })

  it('送信ボタンクリック時に正しいdispatchが呼ばれる', () => {
    render(
      <Provider store={store}>
        <Option />
      </Provider>
    )

    fireEvent.click(screen.getByTestId('send-button'))

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'ImageAction/sendPrompt'
    })
  })
}) 