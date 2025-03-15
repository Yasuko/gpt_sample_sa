import {
    VisionFormInterface
} from '../reducers/VisionForm'

/**
 * Visionフォームのオプションを構築する
 * VisionFormInterfaceから温度と最大トークン数を抽出してオプションオブジェクトを生成します。
 *
 * @param options VisionFormInterface Visionフォームのデータ
 * @returns { temperature: number, max_tokens: number } 構築されたオプションオブジェクト
 */
export const buildOptions = (
    options: VisionFormInterface
): {
    temperature: number,
    max_tokens: number,
} => {
    
    return {
        temperature: options.temperature,
        max_tokens: options.max_tokens,
    }
}

