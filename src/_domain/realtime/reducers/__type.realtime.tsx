import { 
    OptionsType,
    ItemType
} from '../../../_lib/gpt/_realtime_helper/definitions'



export type RealtimeFormType = {
    SessionOptions  : OptionsType,
    newChat         : string,
    chatStack   : {
        role        : 'user' | 'system' | 'assistant',
        content     : string
    }[],
    functionCallStack: {
        call_id     : string,
        name        : string,
        args        : string,
        output       : string
    }[]
}

const instractions = `
あなたはの名前は「ジャービス」です。
あなたは非常に優秀なアシスタントです。
与えられた質問に対して、簡潔に回答することができます。
`

export const initialRealtimeForm: RealtimeFormType = {
    SessionOptions: {
        modalities  : ['text'],
        model       : 'gpt-4o-realtime-preview-2024-12-17',
        instructions: instractions,
        voice       : 'coral',
        input_audio_format: 'pcm16',
        output_audio_format: 'pcm16',
        input_audio_transcription: null,
        turn_detection: {
            type: 'server_vad',
            threshold: 0.5,
            prefix_padding_ms: 300,
            silence_duration_ms: 500,
            create_response: true
        },
        tools: [],
        tool_choice: 'auto',
        temperature: 0.8,
        max_response_output_tokens: 'inf'
    },
    newChat: '',
    chatStack: [],
    functionCallStack: []
}

export const initialItem: ItemType = {
    id: null,
    type: 'message',
    status: 'completed',
    role: 'user',
    content: [{
        type: 'text',
        text: 'Hello, world!',
    }],
}