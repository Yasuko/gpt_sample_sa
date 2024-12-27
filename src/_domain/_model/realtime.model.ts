import {
    conn, close,
    enableConversationListener,
    enableInputAudioListener,
    enableResponseListener,
    sessionUpdate,
    addItem,
} from '../../_lib/gpt/realtime.service'
import {
    OptionsType
} from '../../_lib/gpt/_realtime_helper/definitions'
import { SessionUpdateEventType } from '../../_lib/gpt/_realtime_helper/definitions_client'
import { initialItem } from '../realtime/reducers/__type.realtime'


export const connect = async (
    key: string,
    client_media: MediaStream
) => {
    try {
        await conn(key, {}, client_media, 'realtime_server')
        enableConversationListener()
        enableInputAudioListener()
        enableResponseListener()
    } catch (error) {
        console.error(error)
        close()
    }
}

export const disconnect = async () => {
    try {
        await close()
    } catch (error) {
        console.error(error)
    }
}

export const updateSession = async (data: OptionsType) => {
    await sessionUpdate(data)
}

export const pushText = async (text: string) => {
    const textObj = initialItem
    textObj.content = [{
        type: 'input_text',
        text: text
    }]
    await addItem(textObj)
}