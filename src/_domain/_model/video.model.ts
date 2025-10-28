import { VideoService, type GenerateArgs } from '../../_lib/gpt/video.service'
import type { EditVideoOptions, ListVideosResponse, VideoItem } from '../../_lib/gpt/helpers/video.helper'

/**
 * VideoModel
 * - VideoService の薄いラッパーとして、ドメイン層からの呼び出し窓口を提供します。
 * - API キー/ベース URL の注入と、各ユースケースのメソッドを公開します。
 */
export class VideoModel {
    private static instance: VideoModel

    /**
     * シングルトン呼び出し
     * @param key OpenAI API キー
     * @param baseUrl 任意のベース URL（OpenAI 以外に向ける場合）
     * @returns VideoModel
     */
    public static call(key: string, baseUrl?: string): VideoModel {
        if (!VideoModel.instance) {
            VideoModel.instance = new VideoModel(key, baseUrl)
        } else {
            // update api key/base url if called again
            VideoService.call({ apiKey: key, baseUrl })
        }
        return VideoModel.instance
    }

    /**
     * @param key OpenAI API キー
     * @param baseUrl 任意のベース URL
     */
    public constructor(key: string, baseUrl?: string) {
        VideoService.call({ apiKey: key, baseUrl })
    }

    /**
     * 動画を生成
     * @param args 生成オプション（wait/onProgress/filename を含む拡張）
     * @returns 生成結果 VideoItem（完了時はダウンロード情報を含む場合あり）
     */
    public async generate(args: GenerateArgs): Promise<VideoItem & { download_url_local?: string; blob?: Blob } > {
        return await VideoService.call().generate(args)
    }

    /**
     * 動画を編集
     * @param args 編集オプション（wait/filename など拡張）
     * @returns 編集結果 VideoItem（完了時はダウンロード情報を含む場合あり）
     */
    public async edit(args: EditVideoOptions & { wait?: boolean; filename?: string }): Promise<VideoItem & { download_url_local?: string; blob?: Blob } > {
        return await VideoService.call().edit(args)
    }

    /**
     * 動画一覧取得
     * @param params limit/after
     * @returns ListVideosResponse
     */
    public async list(params?: { limit?: number; after?: string }): Promise<ListVideosResponse> {
        return await VideoService.call().list(params)
    }

    /**
     * 動画詳細取得
     * @param id ビデオ ID
     * @returns VideoItem
     */
    public async get(id: string): Promise<VideoItem> {
        return await VideoService.call().get(id)
    }

    /**
     * 進捗ポーリング（サービス実装に委譲）
     * @param id ビデオ ID
     * @param onProgress 進捗コールバック
     * @param options ポーリング間隔/タイムアウト
     * @returns 完了時の VideoItem
     */
    public async poll(id: string, onProgress?: (p: number, status: VideoItem['status'], item?: VideoItem) => void, options?: { intervalMs?: number; timeoutMs?: number }): Promise<VideoItem> {
        return await VideoService.call().poll(id, onProgress, options)
    }

    /**
     * 動画削除
     * @param id ビデオ ID
     * @returns { id, deleted }
     */
    public async delete(id: string): Promise<{ id: string; deleted: boolean }> {
        return await VideoService.call().delete(id)
    }

    /**
     * 動画ダウンロード
     * @param id ビデオ ID
     * @param filename 任意の保存ファイル名
     * @returns Blob と ObjectURL
     */
    public async download(id: string, filename?: string): Promise<{ blob: Blob; url: string }> {
        return await VideoService.call().download(id, filename)
    }
}
