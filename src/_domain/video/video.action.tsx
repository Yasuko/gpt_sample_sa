import { put, select, takeEvery, delay } from 'redux-saga/effects'

// import animation
import { loadingShow, loadingHide } from '../animation/animation'

// import model
import { VideoModel } from '../_model/video.model'

// reducer states
import { type VideoOptionPropsInterface } from './reducers/VideoOption'
import { type VideoEditOptionPropsInterface } from './reducers/VideoEditOption'
import { type VideoListPropsInterface } from './reducers/VideoList'

import { type TokenFormPropsInterface } from '../token/reducers/TokenForm'

// validation helper
import { VideoValidateHelper } from './helper/validate.helper'

const Token = (state: TokenFormPropsInterface) => state.TokenForm
const videoOption = (state: VideoOptionPropsInterface) => state.VideoOption
const videoEditOption = (state: VideoEditOptionPropsInterface) => state.VideoEditOption
const videoList = (state: VideoListPropsInterface) => state.VideoList

/**
 * Video ドメインの Root Action 登録
 * - 生成/編集/一覧/取得/ポーリング/削除/ダウンロード のサガを束ねます。
 */
export const RootVideoDomainAction = [
  takeEvery('VideoAction/generate', generate),
  takeEvery('VideoAction/edit', edit),
  takeEvery('VideoAction/list', list),
  takeEvery('VideoAction/get', get),
  takeEvery('VideoAction/poll', poll),
  takeEvery('VideoAction/delete', deleteVideo),
  takeEvery('VideoAction/download', download),
]

/**
 * 動画を生成するサガ
 * - VideoOption の入力を検証し、ジョブ作成 → 2秒間隔ポーリングで進捗を保存します。
 * @param val any 任意（将来の拡張用）
 */
function* generate(val: any): any {
  yield loadingShow('Now 動画生成中…')
  try {
    const options = yield select(videoOption)
    const token = yield select(Token)

  const valid = yield VideoValidateHelper.validateGenerate(options as any)
    // まずジョブ作成
    const created = yield VideoModel.call(token.token).generate({ ...valid, wait: false })
    yield put({ type: 'VideoList/addItem', item: created })
    // 手動ポーリングで進捗更新
    while (true) {
      const current = yield VideoModel.call(token.token).get(created.id)
      const p = typeof current.progress === 'number' ? current.progress : (current.status === 'completed' ? 100 : current.status === 'processing' ? 50 : current.status === 'queued' ? 1 : 0)
      yield put({ type: 'VideoProgress/upsert', id: created.id, progress: p, status: current.status, item: current })
      if (current.status === 'completed') {
        yield put({ type: 'VideoList/updateItem', item: current })
        yield put({ type: 'VideoProgress/clear', id: created.id })
        break
      }
      if (current.status === 'failed' || current.status === 'canceled') {
        yield put({ type: 'VideoList/updateItem', item: current })
        yield put({ type: 'VideoProgress/clear', id: created.id })
        break
      }
      yield delay(2000)
    }
  } catch (e) {
    console.error('VideoAction/generate error', e)
  }
  yield loadingHide()
}

/**
 * 動画を編集するサガ
 * - VideoEditOption の入力を検証し、ジョブ作成 → 2秒間隔ポーリングで進捗を保存します。
 * @param val any 任意（将来の拡張用）
 */
function* edit(val: any): any {
  yield loadingShow('Now 動画編集中…')
  try {
    const options = yield select(videoEditOption)
    const token = yield select(Token)

    const valid = VideoValidateHelper.validateEdit(options as any)
    const created = yield VideoModel.call(token.token).edit({ ...valid, wait: false })
    yield put({ type: 'VideoList/addItem', item: created })
    while (true) {
      const current = yield VideoModel.call(token.token).get(created.id)
      const p = typeof current.progress === 'number' ? current.progress : (current.status === 'completed' ? 100 : current.status === 'processing' ? 50 : current.status === 'queued' ? 1 : 0)
      yield put({ type: 'VideoProgress/upsert', id: created.id, progress: p, status: current.status, item: current })
      if (current.status === 'completed') {
        yield put({ type: 'VideoList/updateItem', item: current })
        yield put({ type: 'VideoProgress/clear', id: created.id })
        break
      }
      if (current.status === 'failed' || current.status === 'canceled') {
        yield put({ type: 'VideoList/updateItem', item: current })
        yield put({ type: 'VideoProgress/clear', id: created.id })
        break
      }
      yield delay(2000)
    }
  } catch (e) {
    console.error('VideoAction/edit error', e)
  }
  yield loadingHide()
}

/**
 * 動画一覧を取得するサガ
 * @param val { params?: { limit?: number; after?: string } }
 */
function* list(val: any): any {
  try {
    const token = yield select(Token)
    // 支援: 直接 dispatch({ type, params }) と TokenAction.next 経由の dispatch({ type, payload: { params } }) の両方に対応
    const params = val?.params ?? val?.payload?.params
    const res = yield VideoModel.call(token.token).list(params)
    yield put({ type: 'VideoList/setItems', items: res.data })
  } catch (e) {
    console.error('VideoAction/list error', e)
  }
}

/**
 * 動画の詳細（進捗含む）を取得するサガ
 * @param val { id: string }
 */
function* get(val: any): any {
  try {
    const token = yield select(Token)
    const item = yield VideoModel.call(token.token).get(val.id)
    yield put({ type: 'VideoList/updateItem', item })
  } catch (e) {
    console.error('VideoAction/get error', e)
  }
}

/**
 * 指定 ID のジョブをポーリングし、完了/失敗まで進捗を更新するサガ
 * @param val { id: string, options?: { intervalMs?: number } }
 */
function* poll(val: any): any {
  try {
    const token = yield select(Token)
    while (true) {
      const current = yield VideoModel.call(token.token).get(val.id)
      const p = typeof current.progress === 'number' ? current.progress : (current.status === 'completed' ? 100 : current.status === 'processing' ? 50 : current.status === 'queued' ? 1 : 0)
      yield put({ type: 'VideoProgress/upsert', id: val.id, progress: p, status: current.status, item: current })
      if (current.status === 'completed') {
        yield put({ type: 'VideoList/updateItem', item: current })
        yield put({ type: 'VideoProgress/clear', id: val.id })
        break
      }
      if (current.status === 'failed' || current.status === 'canceled') {
        yield put({ type: 'VideoList/updateItem', item: current })
        yield put({ type: 'VideoProgress/clear', id: val.id })
        break
      }
      yield delay(val?.options?.intervalMs ?? 2000)
    }
  } catch (e) {
    console.error('VideoAction/poll error', e)
  }
}

/**
 * 動画を削除するサガ
 * @param val { id: string }
 */
function* deleteVideo(val: any): any {
  try {
    const token = yield select(Token)
    const res = yield VideoModel.call(token.token).delete(val.id)
    if (res.deleted) {
      yield put({ type: 'VideoList/deleteItem', id: val.id })
      yield put({ type: 'VideoProgress/clear', id: val.id })
    }
  } catch (e) {
    console.error('VideoAction/delete error', e)
  }
}

/**
 * 動画をダウンロードするサガ
 * @param val { id: string, filename?: string }
 */
function* download(val: any): any {
  try {
    const token = yield select(Token)
    yield VideoModel.call(token.token).download(val.id, val?.filename)
  } catch (e) {
    console.error('VideoAction/download error', e)
  }
}
