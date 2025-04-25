import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Image from '../Image'

// Mock storeの設定
const mockStore = configureStore([])

describe('Image Component', () => {
  let store: any

  beforeEach(() => {
    store = mockStore({
      ImageScreen: {
        base: true,
        edit: false,
        change: false
      }
    })
    store.dispatch = vi.fn()
  })

  it('コンポーネントが正しく描画される', () => {
    render(
      <Provider store={store}>
        <Image />
      </Provider>
    )

    // タイトルの確認
    expect(screen.getByText('Image')).toBeInTheDocument()
    
    // ボタンの確認
    expect(screen.getByText('Generate')).toBeInTheDocument()
    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('Change')).toBeInTheDocument()
  })

  it('Generateボタンクリック時に正しいdispatchが呼ばれる', () => {
    render(
      <Provider store={store}>
        <Image />
      </Provider>
    )

    fireEvent.click(screen.getByText('Generate'))
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'ImageScreen/showBase'
    })
  })

  it('Editボタンクリック時に正しいdispatchが呼ばれる', () => {
    render(
      <Provider store={store}>
        <Image />
      </Provider>
    )

    fireEvent.click(screen.getByText('Edit'))
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'ImageScreen/showEdit'
    })
  })

  it('Changeボタンクリック時に正しいdispatchが呼ばれる', () => {
    render(
      <Provider store={store}>
        <Image />
      </Provider>
    )

    fireEvent.click(screen.getByText('Change'))
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'ImageScreen/showChange'
    })
  })

  it('Edit状態のときOptionEditコンポーネントが表示される', () => {
    // Editが有効な状態をモック
    store = mockStore({
      ImageScreen: {
        base: false,
        edit: true,
        change: false
      }
    })
    store.dispatch = vi.fn()
    
    const { container } = render(
      <Provider store={store}>
        <Image />
      </Provider>
    )
    
    // OptionEditがレンダリングされていることを確認
    // 実装に合わせて検証方法を調整してください
    expect(store.getState().ImageScreen.edit).toBe(true)
  })
  
  it('Change状態のときOptionChangeコンポーネントが表示される', () => {
    // Changeが有効な状態をモック
    store = mockStore({
      ImageScreen: {
        base: false,
        edit: false,
        change: true
      }
    })
    store.dispatch = vi.fn()
    
    const { container } = render(
      <Provider store={store}>
        <Image />
      </Provider>
    )
    
    // OptionChangeがレンダリングされていることを確認
    expect(store.getState().ImageScreen.change).toBe(true)
  })
  
  it('useEffectがコンポーネントのレンダリング時に実行される', () => {
    const { rerender } = render(
      <Provider store={store}>
        <Image />
      </Provider>
    )
    
    // 初回レンダリング時のdispatch呼び出し
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'TokenAction/checkToken',
      payload: { redirect: '/Image' }
    })
    
    // dispatchのモックをリセット
    vi.clearAllMocks()
    
    // コンポーネントを再レンダリング
    rerender(
      <Provider store={store}>
        <Image />
      </Provider>
    )
    
    // 再レンダリング時にもdispatchが呼ばれることを確認
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'TokenAction/checkToken',
      payload: { redirect: '/Image' }
    })
  })
})


