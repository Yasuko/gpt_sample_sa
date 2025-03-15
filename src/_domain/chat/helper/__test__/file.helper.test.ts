import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FileHelper } from '../file.helper';
import { DragService } from '../../../../_lib/drag/drag.service';

// DragServiceのモックを設定
vi.mock('../../../_lib/drag/drag.service', () => {
	return {
		DragService: {
			call: vi.fn(() => ({
				setTarget: vi.fn(() => Promise.resolve()),
				onDrop: vi.fn(() => Promise.resolve()),
				getImage: vi.fn(() => ['mockImage1', 'mockImage2']),
			})),
		},
	};
});

describe('FileHelper', () => {
	let fileHelper: FileHelper;

	beforeEach(() => {
		// シングルトンインスタンスのリセット
		(FileHelper as any).instance = null;
		fileHelper = FileHelper.call();
	});

	it('getDataFile は最初のファイルを返すべき', () => {
		(fileHelper as any).file = ['file1', 'file2'];
		expect(fileHelper.getDataFile()).toBe('file1');
	});

	it('getImages は全てのファイルを返すべき', () => {
		(fileHelper as any).file = ['file1', 'file2'];
		expect(fileHelper.getImages()).toEqual(['file1', 'file2']);
	});

	it('dragStart は DragService.setTarget を呼び出すべき', async () => {
		const setTargetSpy = vi.spyOn(DragService.call(), 'setTarget');
		await fileHelper.dragStart('testTarget');
		expect(setTargetSpy).toHaveBeenCalledWith('testTarget');
	});

	it('dragEnd は DragService.onDrop を呼び出し、ファイルリストを更新すべき', async () => {
		const onDropSpy = vi.spyOn(DragService.call(), 'onDrop');
		await fileHelper.dragEnd({} as any);
		expect(onDropSpy).toHaveBeenCalled();
		expect((fileHelper as any).file).toEqual(['mockImage1', 'mockImage2']);
	});
});