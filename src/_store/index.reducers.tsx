import { animationReducers } from '../pages/animation/index.reducer'

import { WhisperReducer } from '../_domain/whisper/index.reducers'
import { ChatReducer } from '../_domain/chat/index.reducers'
import { CompReducer } from '../_domain/comp/index.reducers'
import { ImageReducer } from '../_domain/image/index.reducers'
import { VisionReducer } from '../_domain/vision/index.reducers'
import { SpeechReducer } from '../_domain/speech/index.reducers'
import { EmbedReducer } from '../_domain/embed/index.reducers'
import { TokenReducer } from '../_domain/token/index.reducers'
import { RealtimeReducer } from '../_domain/realtime/index.reducers'
import { ResponseReducer } from '../_domain/response/index.reducers'

import ShowContent from '../_domain/_all/reducers/ShowContent'
import JobStack from '../_domain/_all/reducers/JobStack'
import Tools from '../_domain/_all/reducers/Tools'
import ResponseFormat from '../_domain/_all/reducers/ResponseFormat'
import Token from '../_domain/_all/reducers/Token'

export const reducer = {
    ...animationReducers,
    ...WhisperReducer,
    ...ChatReducer,
    ...CompReducer,
    ...ImageReducer,
    ...VisionReducer,
    ...SpeechReducer,
    ...EmbedReducer,
    ...TokenReducer,
    ...RealtimeReducer,
    ...ResponseReducer,
    ShowContent,
    JobStack,
    Tools,
    ResponseFormat,
    Token,
}
