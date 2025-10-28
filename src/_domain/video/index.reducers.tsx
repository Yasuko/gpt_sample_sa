import VideoList from './reducers/VideoList'
import VideoOption from './reducers/VideoOption'
import VideoEditOption from './reducers/VideoEditOption'
import VideoProgress from './reducers/VideoProgress'

/**
 * VideoReducer エクスポート
 * - Video ドメインの全スライスをまとめて公開します。
 */

export const VideoReducer = {
    VideoList,
    VideoOption,
    VideoEditOption,
    VideoProgress,
}
