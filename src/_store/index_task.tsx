import { all } from 'redux-saga/effects'

import { RootChatAction } from '../_domain/chat/chat.action'
import { RootCompAction } from '../_domain/comp/comp.action'
import { RootImageAction } from '../_domain/image/image.action'
import { RootWhisperDomain } from '../_domain/whisper/index.task'
import { RootSocketAction } from '../_domain/socket/socket.action'
import { RootVisionAction } from '../_domain/vision/vision.action'
import { RootSpeechAction } from '../_domain/speech/speech.action'
import { RootEmbedAction } from '../_domain/embed/embed.action'
import { RootTokenAction } from '../_domain/token/token.action'
// Load AnimationAction
import { AnimationTask } from '../pages/animation/index.task'



export default function* rootSaga() {
    yield all([
        ...RootChatAction,
        ...RootCompAction,
        ...RootImageAction,
        ...RootWhisperDomain,
        ...RootSocketAction,
        ...RootVisionAction,
        ...RootSpeechAction,
        ...RootEmbedAction,
        ...RootTokenAction,
        ...AnimationTask
    ]);
}
