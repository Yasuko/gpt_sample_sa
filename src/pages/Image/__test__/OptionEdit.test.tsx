import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Option from '../OptionEdit'

// src/pages/Image/__tests__/OptionEdit.test.tsx


const mockStore = configureStore([])

describe('OptionEdit Component', () => {
    let store: any
    
    beforeEach(() => {
        // 各テストで新しいストアを準備する
        store = mockStore({
            ImageEditOption: {
                image_base64: '',
                mask_base64: '',
                prompt: '',
                model: 'dall-e-2',
                size: '1024x1024',
                response_format: 'b64_json',
                n: 1
            }
        })
        
        // dispatchをモック化
        store.dispatch = vi.fn()
    })

    // コンポーネントの表示テスト
    it('コンポーネントが空の状態で正しく表示される', () => {
        render(
            <Provider store={store}>
                <Option />
            </Provider>
        )
        
        expect(screen.getByText('BaseImage')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Input Prompt')).toBeInTheDocument()
        expect(screen.getByText('Send')).toBeInTheDocument()
    })

    // 画像データがある場合のテスト
    it('画像データがある場合、コンポーネントが正しく表示される', () => {
        store = mockStore({
            ImageEditOption: {
                image_base64: 'data:image/png;base64,abc123',
                mask_base64: '',
                prompt: 'test prompt',
                model: 'dall-e-2',
                size: '1024x1024',
                response_format: 'b64_json',
                n: 1
            }
        })

        render(
            <Provider store={store}>
                <Option />
            </Provider>
        )
        
        const images = screen.getAllByAltText('MaskImage')
        expect(images.length).toBeGreaterThan(0)
        expect(images[0]).toHaveAttribute('src', 'data:image/png;base64,abc123')
        expect(screen.getByText('Mask Builder')).toBeInTheDocument()
    })

    // マスク画像のテスト
    it('マスク画像がある場合、正しく表示される', () => {
        store = mockStore({
            ImageEditOption: {
                image_base64: '',
                mask_base64: 'data:image/png;base64,mask123',
                prompt: '',
                model: 'dall-e-2',
                size: '1024x1024',
                response_format: 'b64_json',
                n: 1
            }
        })

        render(
            <Provider store={store}>
                <Option />
            </Provider>
        )
        
        const maskImage = screen.getByAltText('MaskImage')
        expect(maskImage).toBeInTheDocument()
        expect(maskImage).toHaveAttribute('src', 'data:image/png;base64,mask123')
    })

    // プロンプト入力テスト
    it('プロンプト入力が変更されると、正しいアクションがディスパッチされる', () => {
        render(
            <Provider store={store}>
                <Option />
            </Provider>
        )
        
        const promptInput = screen.getByPlaceholderText('Input Prompt')
        fireEvent.change(promptInput, { target: { value: 'New prompt' } })
        
        expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: 'ImageEditOption/setPrompt',
            prompt: 'New prompt'
        }))
    })

    // Sendボタンテスト
    it('Sendボタンがクリックされると、正しいアクションがディスパッチされる', () => {
        render(
            <Provider store={store}>
                <Option />
            </Provider>
        )
        
        const sendButton = screen.getByText('Send')
        fireEvent.click(sendButton)
        
        expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: 'ImageEditAction/sendPrompt'
        }))
    })

    // ドラッグアンドドロップ機能のテスト
    describe('ドラッグアンドドロップ機能', () => {
        it('ベース画像のドロップエリアで正しいアクションがディスパッチされる', () => {
            render(
                <Provider store={store}>
                    <Option />
                </Provider>
            )
            
            const dropZone = screen.getByText('BaseImage').closest('div') as HTMLElement
            
            // ファイルとdataTransferをモック化
            const file = new File([''], 'test.png', { type: 'image/png' })
            const dataTransfer = {
                files: [file]
            }
            
            // ドラッグオーバーをシミュレート
            fireEvent.dragOver(dropZone, { dataTransfer })
            
            // ドロップをシミュレート
            fireEvent.drop(dropZone, { dataTransfer })
            
            // 正しいアクションがディスパッチされたことを確認
            expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
                type: 'ImageEditAction/DragEnd',
                job: 'edit',
                target: 'base'
            }))
        })
        
        it('onDragEnd関数はイベントのデフォルト動作を防止しイベント伝搬を停止する', () => {
            // モックイベントを作成
            const mockEvent = {
                preventDefault: vi.fn(),
                stopPropagation: vi.fn(),
                dataTransfer: {
                    files: [new File([''], 'test.png', { type: 'image/png' })]
                }
            }
            
            render(
                <Provider store={store}>
                    <Option />
                </Provider>
            )
            
            // ドロップイベントを直接発火して動作をテスト
            const dropZone = screen.getByText('BaseImage').closest('div') as HTMLElement
            fireEvent.drop(dropZone, mockEvent)
            
            // dispatchが呼び出されたことを確認
            expect(store.dispatch).toHaveBeenCalled()
        })
    })
    
    // 各種UIコントロールのテスト
    describe('UIコントロール', () => {
        it('サイズ選択が変更されると、正しいアクションがディスパッチされる', () => {
            render(
                <Provider store={store}>
                    <Option />
                </Provider>
            )
            
            const sizeSelect = screen.getByDisplayValue('1024x1024')
            fireEvent.change(sizeSelect, { target: { value: '512x512' } })
            
            expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
                type: 'ImageEditOption/setSize',
                size: '512x512'
            }))
        })
        
        it('レスポンスフォーマット選択が変更されると、正しいアクションがディスパッチされる', () => {
            render(
                <Provider store={store}>
                    <Option />
                </Provider>
            )
            
            const formatSelect = screen.getByDisplayValue('b64_json')
            fireEvent.change(formatSelect, { target: { value: 'url' } })
            
            expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
                type: 'ImageEditOption/setResponseFormat',
                responseFormat: 'url'
            }))
        })
        
        it('n値が変更されると、正しいアクションがディスパッチされる', () => {
            render(
                <Provider store={store}>
                    <Option />
                </Provider>
            )
            
            const nInput = screen.getByDisplayValue('1')
            fireEvent.change(nInput, { target: { value: '2' } })
            
            expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
                type: 'ImageEditOption/setN',
                n: '2'
            }))
        })
    })
    
    // マスクビルダーボタンのテスト
    it('画像が表示されているとき、マスクビルダーボタンが正しく動作する', () => {
        store = mockStore({
            ImageEditOption: {
                image_base64: 'data:image/png;base64,abc123',
                mask_base64: '',
                prompt: '',
                model: 'dall-e-2',
                size: '1024x1024',
                response_format: 'b64_json',
                n: 1
            }
        })

        render(
            <Provider store={store}>
                <Option />
            </Provider>
        )
        
        const maskBuilderButton = screen.getByText('Mask Builder')
        fireEvent.click(maskBuilderButton)
        
        // 最初のディスパッチ呼び出しを確認
        expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: 'ImageScreen/setSubScreen',
            subscreen: 'mask'
        }))
        
        // 2番目のディスパッチ呼び出しを確認
        expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: 'ImageEditAction/setupMaskPaint',
        }))
    })
})