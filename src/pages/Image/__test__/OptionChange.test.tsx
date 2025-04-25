import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { OptionChange } from '../OptionChange'
import '@testing-library/jest-dom'

// src/pages/Image/__tests__/OptionChange.test.tsx

const mockStore = configureStore([])

// useSelectorのグローバルモック
let useSelectorMockValue: any = null;
vi.mock('react-redux', async () => {
    const actual = await vi.importActual<typeof import('react-redux')>('react-redux')
    return {
        ...actual,
        useSelector: (fn: any) => fn(useSelectorMockValue ?? actual)
    }
})

describe('OptionChange コンポーネント', () => {
    // 基本的なモックデータを設定
    const initialMockState = {
        ImageChangeOption: {
            model: 'dall-e-2',
            size: '512x512',
            response_format: 'b64_json',
            n: 1,
            image_base64: ''
        }
    }

    afterEach(() => {
        vi.unstubAllGlobals() // FileReaderなどのグローバルモックを解除
        useSelectorMockValue = null
    })

    it('コンポーネントが正しくレンダリングされること', () => {
        const store = mockStore(initialMockState)
        
        render(
            <Provider store={store}>
                <OptionChange />
            </Provider>
        )
        
        // ドラッグエリアが表示されること
        expect(screen.getByText('ChangeImage')).toBeInTheDocument()
        
        // 各セレクトボックスとラベルが表示されること
        expect(screen.getByText('model :')).toBeInTheDocument()
        expect(screen.getByText('size :')).toBeInTheDocument()
        expect(screen.getByText('response_format :')).toBeInTheDocument()
        expect(screen.getByText('n :')).toBeInTheDocument()
        
        // Sendボタンが表示されること
        expect(screen.getByText('Send')).toBeInTheDocument()
        
        // 各選択肢が表示されること
        const selects = screen.getAllByRole('combobox')
        expect(selects).toHaveLength(3)
    })

    it('画像がある場合、正しく表示されること', () => {
        const storeWithImage = mockStore({
            ImageChangeOption: {
                ...initialMockState.ImageChangeOption,
                image_base64: 'data:image/png;base64,abc123'
            }
        })
        
        render(
            <Provider store={storeWithImage}>
                <OptionChange />
            </Provider>
        )
        
        // 画像が表示されること
        const image = screen.getByAltText('MaskImage') // alt属性を指定して取得
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('src', 'data:image/png;base64,abc123')
    })

    it('Sendボタンをクリックすると正しいアクションがディスパッチされること', () => {
        const store = mockStore(initialMockState)
        
        render(
            <Provider store={store}>
                <OptionChange />
            </Provider>
        )
        
        // ボタンをクリック
        const sendButton = screen.getByText('Send')
        fireEvent.click(sendButton)
        
        // ディスパッチされたアクションを検証
        const actions = store.getActions()
        expect(actions).toHaveLength(1)
        expect(actions[0]).toEqual({
            type: 'ImageChangeAction/sendPrompt'
        })
    })

    it('モデル選択を変更すると正しいアクションがディスパッチされること', () => {
        const store = mockStore(initialMockState)
        
        render(
            <Provider store={store}>
                <OptionChange />
            </Provider>
        )
        
        // モデルの選択を変更
        const modelSelect = screen.getAllByRole('combobox')[0]
        fireEvent.change(modelSelect, { target: { value: 'dall-e-2' } })
        
        // ディスパッチされたアクションを検証
        const actions = store.getActions()
        expect(actions).toHaveLength(1)
        expect(actions[0]).toEqual({
            type: 'ImageChangeOption/setModel',
            model: 'dall-e-2'
        })
    })

    it('サイズ選択を変更すると正しいアクションがディスパッチされること', () => {
        const store = mockStore(initialMockState)
        
        render(
            <Provider store={store}>
                <OptionChange />
            </Provider>
        )
        
        // サイズの選択を変更
        const sizeSelect = screen.getAllByRole('combobox')[1]
        fireEvent.change(sizeSelect, { target: { value: '1024x1024' } })
        
        // ディスパッチされたアクションを検証
        const actions = store.getActions()
        expect(actions).toHaveLength(1)
        expect(actions[0]).toEqual({
            type: 'ImageChangeOption/setSize',
            size: '1024x1024'
        })
    })

    it('レスポンスフォーマットを変更すると正しいアクションがディスパッチされること', () => {
        const store = mockStore(initialMockState)
        
        render(
            <Provider store={store}>
                <OptionChange />
            </Provider>
        )
        
        // レスポンスフォーマットの選択を変更
        const formatSelect = screen.getAllByRole('combobox')[2]
        fireEvent.change(formatSelect, { target: { value: 'url' } })
        
        // ディスパッチされたアクションを検証
        const actions = store.getActions()
        expect(actions).toHaveLength(1)
        expect(actions[0]).toEqual({
            type: 'ImageChangeOption/setResponseFormat',
            responseFormat: 'url'
        })
    })

    it('n値を変更すると正しいアクションがディスパッチされること', () => {
        const store = mockStore(initialMockState)
        
        render(
            <Provider store={store}>
                <OptionChange />
            </Provider>
        )
        
        // n値を変更
        const nInput = screen.getByRole('spinbutton')
        fireEvent.change(nInput, { target: { value: '2' } })
        
        // ディスパッチされたアクションを検証
        const actions = store.getActions()
        expect(actions).toHaveLength(1)
        expect(actions[0]).toEqual({
            type: 'ImageChangeOption/setN',
            n: '2'
        })
    })

    it('ドラッグ&ドロップ機能が正しく動作すること', async () => {
        const store = mockStore(initialMockState)

        // FileReaderをモック
        const fileReaderMock: any = {
            readAsDataURL: vi.fn(function(this: { onload: ((event: { target: any }) => void) | null, result: string | null }) {
                setTimeout(() => {
                    if (typeof this.onload === 'function') {
                        this.result = 'data:image/png;base64,mocked';
                        this.onload({ target: this });
                    }
                }, 0)
            }),
            onload: null,
            result: null
        }
        vi.stubGlobal('FileReader', function() {
            return fileReaderMock
        })

        render(
            <Provider store={store}>
                <OptionChange />
            </Provider>
        )

        const dragArea = screen.getByText('ChangeImage').parentElement as HTMLElement
        fireEvent.dragOver(dragArea)
        const mockDataTransfer = {
            files: [new File(['dummy content'], 'test.png', { type: 'image/png' })]
        }
        fireEvent.drop(dragArea, { dataTransfer: mockDataTransfer })

        // アクションがディスパッチされるまで待つ
        await waitFor(() => {
            const actions = store.getActions()
            expect(actions).toHaveLength(1)
            expect(actions[0].type).toBe('ImageChangeAction/DragEnd')
            expect(actions[0].job).toBe('change')
        })
    })

    it('useSelectorが正しく値を取得していることを確認', async () => {
        // useSelectorで返す値をセット
        useSelectorMockValue = {
            ImageChangeOption: {
                model: 'custom-model',
                size: '256x256',
                response_format: 'url',
                n: 3,
                image_base64: ''
            }
        }

        // OptionChangeのimportをdynamic importで取得
        const { OptionChange: OptionChangeWithMock } = await import('../OptionChange');

        // レンダリング
        render(
            <Provider store={mockStore({})}>
                <OptionChangeWithMock />
            </Provider>
        )

        // 値が反映されるまでwaitForでリトライ
        await waitFor(() => {
            const modelSelect = screen.getAllByRole('combobox')[0]
            // デバッグ用: 実際の値を出力
            // console.log('modelSelect value:', modelSelect.value)
            expect(modelSelect).toHaveValue('custom-model')
        }, { timeout: 1000 })

        // 他の値も確認
        const sizeSelect = screen.getAllByRole('combobox')[1]
        expect(sizeSelect).toHaveValue('256x256')
        const formatSelect = screen.getAllByRole('combobox')[2]
        expect(formatSelect).toHaveValue('url')
        const nInput = screen.getByRole('spinbutton')
        expect(nInput).toHaveValue(3)
    })
})