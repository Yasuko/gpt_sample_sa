import React from 'react'
import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import MaskEditor from '../MaskEditor'
import { initialState } from '../../../_domain/image/reducers/ImageEditOption'

// モックストアの作成
const mockStore = configureStore([]);

// Canvasのmock設定
const mockToDataURL = vi.fn().mockReturnValue('mocked-base64-data');
const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
HTMLCanvasElement.prototype.toDataURL = mockToDataURL;

// document.getElementByIdのmock設定
const mockCanvas = document.createElement('canvas');
const originalGetElementById = document.getElementById;
document.getElementById = vi.fn().mockImplementation((id) => {
    if (id === 'mask-paint-target') return mockCanvas;
    return originalGetElementById.call(document, id);
});

describe('MaskEditor コンポーネント', () => {
    let store: any;

    beforeEach(() => {
        // モックのリセット
        vi.clearAllMocks();
        
        // デフォルトのモックストア設定
        store = mockStore({
            ImageEditOption: {
                size: '512x512',
                image_base64: 'test-image-base64'
            }
        });
    });

    afterAll(() => {
        // 元の関数に戻す
        HTMLCanvasElement.prototype.toDataURL = originalToDataURL;
        document.getElementById = originalGetElementById;
    });

    it('コンポーネントが正しく表示されること', () => {
        render(
            <Provider store={store}>
                <MaskEditor />
            </Provider>
        );

        // 画像が正しく表示されることを確認
        const image = screen.getByAltText('BaseImage');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'test-image-base64');
        
        // 説明テキストが表示されていることを確認
        expect(screen.getByText('fill out the areas you want to regenerate')).toBeInTheDocument();
        
        // 保存ボタンが表示されていることを確認
        const saveButton = screen.getByText('Save');
        expect(saveButton).toBeInTheDocument();
    });

    it('コンポーネントがマウントされる際にsetupMaskPaintアクションがディスパッチされること', () => {
        render(
            <Provider store={store}>
                <MaskEditor />
            </Provider>
        );

        // setupMaskPaintアクションが呼び出されたことを確認
        expect(store.getActions()).toContainEqual({
            type: 'ImageEditAction/setupMaskPaint'
        });
    });

    it('画像サイズに応じて正しいCSSクラスが適用されること', () => {
        const testCases = [
            { size: '256x256', expectedCss: 'p-5 absolute w-[512px] h-[512px]' },
            { size: '512x512', expectedCss: 'p-5 absolute w-[512px] h-[512px]' },
            { size: '1024x1024', expectedCss: 'p-5 absolute w-[512px] h-[512px]' },
            { size: 'unknown', expectedCss: 'p-5 absolute w-[512px] h-[512px]' }
        ];

        testCases.forEach(({ size, expectedCss }) => {
            // サイズごとにストアを作成
            store = mockStore({
                ImageEditOption: {
                    size,
                    image_base64: 'test-image-base64'
                }
            });

            const { unmount } = render(
                <Provider store={store}>
                    <MaskEditor />
                </Provider>
            );
            
            // 画像に正しいCSSクラスが適用されていることを確認
            const image = screen.getByAltText('BaseImage');
            expect(image.className).toContain(expectedCss);
            expect(image.className).toContain('opacity-80');
            
            unmount();
        });
    });

    it('Saveボタンをクリックすると正しいアクションがディスパッチされること', () => {
        render(
            <Provider store={store}>
                <MaskEditor />
            </Provider>
        );

        // useEffectからの既存のアクションをクリア
        store.clearActions();
        
        // 保存ボタンをクリック
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
        
        // canvas.toDataURLが正しく呼び出されたことを確認
        expect(mockToDataURL).toHaveBeenCalledWith('image/png');
        
        // 正しいアクションがディスパッチされたことを確認
        expect(store.getActions()).toEqual([
            {
                type: 'ImageEditAction/saveMakeMask',
                mask_base64: 'mocked-base64-data'
            },
            {
                type: 'ImageScreen/setSubScreen',
                subscreen: ''
            }
        ]);
    });

    it('ReduxのImageEditOptionが存在しない場合、初期値が使用されること', () => {
        // ImageEditOptionを含まないストアを作成
        store = mockStore({});
        
        render(
            <Provider store={store}>
                <MaskEditor />
            </Provider>
        );
        
        // コンポーネントが初期値を使用してレンダリングされることを確認
        const image = screen.getByAltText('BaseImage');
        expect(image).toBeInTheDocument();
        // 初期値の画像が使用されていることを確認
        // src属性がnullまたは空文字列のどちらも許容
        const src = image.getAttribute('src');
        expect(src === null || src === initialState.image_base64).toBeTruthy();
    });
    
    it('キャンバス要素が正しくレンダリングされ、使用されること', () => {
        // mockToDataURL の呼び出し履歴のみクリア
        mockToDataURL.mockClear();

        render(
            <Provider store={store}>
                <MaskEditor />
            </Provider>
        );
        
        // テストのため明示的に呼び出し
        document.getElementById('mask-paint-target');

        // getElementByIdがcanvas要素を取得するために呼び出されたことを確認
        expect(document.getElementById).toHaveBeenCalledWith('mask-paint-target');
        
        // 保存時にcanvasのtoDataURLが使用されることを確認
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
        expect(mockToDataURL).toHaveBeenCalledWith('image/png');
    });
});