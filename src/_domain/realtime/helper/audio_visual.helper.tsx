import { AudioService } from '../../../_lib/audio/audio.service';
import { AudioBufferService } from '../../../_lib/audio/audio.buffer.service';
import { MediaService } from '../../../_lib/mediaDevice/media.service'


export const initClient = async (): Promise<MediaStream> => {
    // 使用可能なデバイスリスト作成
    await MediaService.call()
        .callDeviceListService()
        .SearchDeviceList()

    // 生成するストリームの設定（ビデオ：無効、オーディオ：有効）
    MediaService.call()
        .callStreamModeService()
        .offVideo()
        .onAudio()

    // ストリーム設定を使用し、デバイスからストリームデータを取得
    await MediaService.call().getLocalStream(
        MediaService.call().callStreamModeService().getStreamMode()
    );

    // オーディオサービスにローカルストリームを渡す
    AudioService.call().setup(
        MediaService.call().getStream(),    // ローカルストリーム
        'realtime_client'                   // ストリーム管理用の識別子
    );

    // AudioタグとAudioContextを繋ぐ
    AudioService.call().audioConnect('realtime_client', true)
    return MediaService.call().getStream()
}

export const initServer = async () => {
    const audio = document.getElementById('realtime_server') as HTMLAudioElement;
    audio.autoplay = true
    AudioBufferService.call().setup('realtime_server')
    AudioBufferService.call().loadAudioElement('realtime_server', audio)
    // AudioタグとAudioContextを繋ぐ
    AudioBufferService.call().audioConnect('realtime_server', true)
}

