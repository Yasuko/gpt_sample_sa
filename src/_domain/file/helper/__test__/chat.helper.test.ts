import { describe, it, expect, vi } from 'vitest';
import { ChatHelper } from '../chat.helper';
import { ChatService } from '../../../../_lib/gpt/chat.service';

describe('ChatHelper', () => {
    it('should return the same instance (singleton)', () => {
        const instance1 = ChatHelper.call();
        const instance2 = ChatHelper.call();
        expect(instance1).toBe(instance2);
    });

    it('should set API key correctly', () => {
        const helper = ChatHelper.call();
        helper.setAPIKey('test-key');
        expect(helper['API_KEY']).toBe('test-key');
    });

    it('should setup chat messages correctly', () => {
        const mockSetAPIKey = vi.spyOn(ChatService.call(), 'setAPIKey').mockReturnValue(undefined);
        const mockSetMessage = vi.spyOn(ChatService.call(), 'setMessage').mockReturnValue(undefined);
        const helper = ChatHelper.call();
        helper.setAPIKey('test-key');
        helper.setup([{ content: 'test' }], undefined);
        expect(mockSetAPIKey).toHaveBeenCalledWith('test-key');
        expect(mockSetMessage).toHaveBeenCalledWith([{ content: 'test' }]);
    });

    it('should get chat result correctly', async () => {
        const mockDo = vi.spyOn(ChatService.call(), 'do').mockResolvedValue(undefined);
        const mockGetResult = vi.spyOn(ChatService.call(), 'getResult').mockReturnValue('result');
        const helper = ChatHelper.call();
        const result = await helper.getResult();
        expect(mockDo).toHaveBeenCalled();
        expect(mockGetResult).toHaveBeenCalled();
        expect(result).toBe('result');
    });

    it('should check API key correctly', () => {
        const helper = ChatHelper.call();
        helper.setAPIKey(''); // Set an empty API key to simulate the absence of a key
        expect(helper.checkApiKey()).toBe(false);
        helper.setAPIKey('test-key');
        expect(helper.checkApiKey()).toBe(true);
    });
});