import { 
    OptionsType
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
        ouput       : string
    }[]
}

export const initialRealtimeForm: RealtimeFormType = {
    SessionOptions: {
        modalities  : ['text'],
        model       : 'gpt-4o-realtime-preview-2024-12-17',
        instructions: 'あなたはの名前はジャービスです。あなたは非常に優秀なアシスタントです。',
        voice       : 'coral',
        inpiut_audio_format: 'pcm16',
        output_audio_format: 'pcm16',
        input_audio_transcription: {
            model: 'whisper-1'
        },
        turn_detection: {
            type: 'server_vad',
            threshold: 0.5,
            prefix_padding_ms: 300,
            silence_duration_ms: 500,
            create_responce: true
        },
        tools: [],
        tool_choice: 'auto',
        temperature: 0.8,
        max_response_output_tokens: Infinity
    },
    newChat: '',
    chatStack: [],
    functionCallStack: []
}
