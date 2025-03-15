// vi.mockを最上部に移動
import { vi } from 'vitest';
vi.mock('@/src/_lib/drag/drag.service', () => {
	return {
		DragService: {
			call: vi.fn(() => ({
				setTarget: vi.fn(() => Promise.resolve()),
				onDrop: vi.fn(() => Promise.resolve()),
				getImage: vi.fn(() => ['mockImage1', 'mockImage2']),
				// ...その他必要なモック関数があれば追加...
			})),
		},
	}});


import { describe, it, expect, beforeEach } from 'vitest';
import { FileHelper } from '../file.helper';
// ...existing code...

describe('FileHelper', () => {
	let fileHelper: FileHelper;

	beforeEach(() => {
		// ...existing code...
		(FileHelper as any).instance = null;
		fileHelper = FileHelper.call();
	});

	it('getDataFile は最初のファイルを返すべき', () => {
		// ...existing code...
		(fileHelper as any).file = ['file1', 'file2'];
		expect(fileHelper.getDataFile()).toBe('file1');
	});

	it('getImages は全てのファイルを返すべき', () => {
		// ...existing code...
		(fileHelper as any).file = ['file1', 'file2'];
		expect(fileHelper.getImages()).toEqual(['file1', 'file2']);
	});

	it('dragStart は DragService.setTarget を呼び出すべき', async () => {
		// ...existing code...
		const dragServiceInstance = (await require('@src/_lib/drag/drag.service')).DragService.call();
		const setTargetSpy = vi.spyOn(dragServiceInstance, 'setTarget');
		await fileHelper.dragStart('testTarget');
		expect(setTargetSpy).toHaveBeenCalledWith('testTarget');
	});

	it('dragEnd は DragService.onDrop を呼び出し、ファイルリストを更新すべき', async () => {
		// ...existing code...
		const dragServiceInstance = (await require('@/src/_lib/drag/drag.service')).DragService.call();
		const onDropSpy = vi.spyOn(dragServiceInstance, 'onDrop');
		// preventDefaultを持つイベントオブジェクトを渡す
		const fakeEvent = { preventDefault: vi.fn() } as any;
		await fileHelper.dragEnd(fakeEvent);
		expect(onDropSpy).toHaveBeenCalled();
		expect((fileHelper as any).file).toEqual(['mockImage1', 'mockImage2']);
	});
});
