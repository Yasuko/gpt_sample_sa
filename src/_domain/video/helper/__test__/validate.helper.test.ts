import { describe, it, expect } from 'vitest'
import { VideoValidateHelper } from '../validate.helper'

describe('VideoValidateHelper (Videos API schema)', () => {
  it('validateEdit should require video_id and prompt', () => {
    const valid = VideoValidateHelper.validateEdit({ video_id: 'video_123', prompt: 'tweak color' } as any)
    expect(valid.video_id).toBe('video_123')
    expect(valid.prompt).toBe('tweak color')
  })

  it('validateGenerate should pass through seconds and size', async () => {
    const valid = await VideoValidateHelper.validateGenerate({ model: 'sora-2', prompt: 'hello', seconds: 8, size: '1280x720' } as any)
    expect(valid.seconds).toBe(8)
    expect(valid.size).toBe('1280x720')
  })
})
