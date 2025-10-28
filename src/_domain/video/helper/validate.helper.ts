import { GenerateVideoOptionsSchema, EditVideoOptionsSchema, type GenerateVideoOptions, type EditVideoOptions } from '../../../_lib/gpt/helpers/video.helper'
import resizeImageFile from './image.resize'

export type ValidGenerate = GenerateVideoOptions
export type ValidEdit = EditVideoOptions

/**
 * VideoValidateHelper
 * - UI 入力（base64/dataURL/URL など）を API スキーマにマッピングし、zod で検証します。
 */
export const VideoValidateHelper = {
  /**
   * 生成オプションの検証
   * @param input UI 層の入力（images_base64/video_base64 を含んでもよい）
   * @returns GenerateVideoOptions（zod 検証済み）
   * @throws Error 入力不足や形式不正
   */
  async validateGenerate(input: Partial<GenerateVideoOptions>): Promise<ValidGenerate> {
    const mapped: GenerateVideoOptions = {
      model: input.model ?? 'sora-2',
      prompt: input.prompt ?? '',
      seconds: input.seconds,
      size: input.size,
      input_reference: (input as any).input_reference,
    }
    if (mapped.prompt.trim().length === 0) throw new Error('prompt is required')

    // input_reference が File の場合はリサイズして差し替え
    const ref: unknown = (input as any)?.input_reference
    if (ref != null) {
      if (ref instanceof File) {
        // サイズ指定があれば使用。なければ一般的な HD にフォールバック
        const targetSize = (mapped as any).size ?? '720x1280'
        try {
          const resized = await resizeImageFile(ref, targetSize as any)
          mapped.input_reference = resized as any
        } catch (e) {
          // リサイズ失敗時は検証を止める（明示的に原因を通知）
          throw new Error((e as Error)?.message || 'failed to resize input_reference')
        }
      } else {
        // 参照があるのに File でない場合は不正
        throw new Error("input_reference must be a File object")
      }
    }

    return GenerateVideoOptionsSchema.parse(mapped)
  },

  /**
   * 編集オプションの検証
   * @param input UI 層の入力（video_base64/mask_base64/images_base64 を含んでもよい）
   * @returns EditVideoOptions（zod 検証済み）
   * @throws Error 入力不足や形式不正
   */
  validateEdit(input: Partial<EditVideoOptions & { prompt: string }>): ValidEdit {
    const mapped: EditVideoOptions = {
      video_id: (input as any).video_id ?? '',
      prompt: (input as any).prompt ?? '',
    }
    if (!mapped.video_id) throw new Error('video_id is required for remix')
    if (mapped.prompt.trim().length === 0) throw new Error('prompt is required')
    return EditVideoOptionsSchema.parse(mapped)
  },
}
