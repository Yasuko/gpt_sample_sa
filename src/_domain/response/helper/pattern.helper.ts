// 型変換ユーティリティ: ResponseHistoryType.content と Input*Object の相互変換
// 依存型は既存の定義からインポートします。
import type {
	InputTextObject,
	InputImageObject,
	InputFileObject,
	InputAudioObject,
} from '../../../_lib/gpt/_helper/response.input.type'
import type { OutputTextObject } from '../../../_lib/gpt/_helper/response.output.type'
import type { ResponseFormType, ResponseOutputType, ResponseHistoryObjectType } from '../reducers/__type.response'

// ---- 内部ヘルパー ---------------------------------------------------------

const guessImageType = (nameOrUrl?: string): 'png' | 'jpg' | 'jpeg' | 'webp' => {
	const n = (nameOrUrl || '').toLowerCase()
	if (n.includes('.webp') || n.startsWith('data:image/webp')) return 'webp'
	if (n.includes('.jpeg') || n.startsWith('data:image/jpeg')) return 'jpeg'
	if (n.includes('.jpg') || n.startsWith('data:image/jpg')) return 'jpg'
	return 'png'
}

const now = () => Date.now()

// ---- Base content -> Input*Object 変換 -------------------------------------

export const toInputText = (content: ResponseFormType['text']): InputTextObject => {
	return {
		type: 'input_text',
		text: content ?? '',
	}
}

export const toInputImage = (content: ResponseFormType['image']): InputImageObject[] => {
	return content.map((v) => {
		return {
			type: 'input_image',
			detail: 'auto',
			image_url: v.image,
		}
	})
}

export const toInputFile = (content: ResponseFormType['file']): InputFileObject[] => {
	return content.map((v) => {
		return {
			type: 'input_file',
			file_data: v.data,
			filename: v.name,
		}
	})
}

export const toInputAudio = (content: ResponseFormType['audio']): InputAudioObject[] => {
	return content.map((v) => {
		return {
			type: 'input_audio',
			input_audio: {
				data: v.data,
				format: v.type,
			},
		}
	})
}

// ---- Input*Object -> Base content 変換 -------------------------------------

export const fromInputText = (obj: OutputTextObject): ResponseFormType['text'] => {
    return obj.text;
}

export const fromInputImage = (obj: InputImageObject): ResponseFormType['image'] => {
	const name = obj.file_id || obj.image_url || ''
	return [{
			image: obj.image_url ?? '',
			date: now(),
			type: guessImageType(name),
			name: typeof name === 'string' ? name : 'image',
			size: 0,
		}]
}

export const fromInputFile = (obj: InputFileObject): ResponseFormType['file'] => {
	// format は ResponseHistoryType 側の制約に合わせて推定（不明時は 'txt'）
	const filename = obj.filename || obj.file_id || obj.file_url || 'file'
	const lower = (filename || '').toLowerCase()
	const ext = lower.endsWith('.pdf')
		? 'pdf'
		: lower.endsWith('.md')
		? 'md'
		: lower.endsWith('.csv')
		? 'csv'
		: lower.endsWith('.json')
		? 'json'
		: 'txt'
	return [{
			data: obj.file_data ?? '',
			date: now(),
			type: ext as 'pdf' | 'txt' | 'md' | 'csv' | 'json',
			name: typeof filename === 'string' ? filename : 'file',
			size: (obj.file_data?.length ?? 0),
		}]
}

export const fromInputAudio = (obj: InputAudioObject): ResponseFormType['audio'] => {
	// ResponseHistoryType はより多いフォーマットを許容するが、入力は 'mp3' | 'wav'
	return [{
			data: obj.input_audio.data,
			date: now(),
			type: obj.input_audio.format,
			name: `audio.${obj.input_audio.format}`,
			size: obj.input_audio.data.length,
		}]
}

// ---- 型ガード（任意） ------------------------------------------------------

export const isInputText = (v: any): v is InputTextObject => v?.type === 'input_text'
export const isInputImage = (v: any): v is InputImageObject => v?.type === 'input_image'
export const isInputFile = (v: any): v is InputFileObject => v?.type === 'input_file'
export const isInputAudio = (v: any): v is InputAudioObject => v?.type === 'input_audio'
