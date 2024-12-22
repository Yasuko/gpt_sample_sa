import {
    setRealTimeOptions,
    init, close,
    send,
} from '../../_lib/gpt/_helper/realtime.helper'


export const conn = async (
    key: string
) => {
    try {
        await init(key)
    } catch (error) {
        console.error(error)
        close()
    }
}

export const sendData = async (data: any) => {
    try {
        await send(data)
    } catch (error) {
        console.error(error)
    }
}