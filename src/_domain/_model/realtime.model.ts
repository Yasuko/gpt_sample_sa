import {
    setRealTimeOptions,
    init, close,
    send,
} from '../../_lib/gpt/_realtime_helper/realtime.helper'


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

export const disconnect = async () => {
    try {
        await close()
    } catch (error) {
        console.error(error)
    }
}


export const sendData = async (data: any) => {
    try {
        await send(data)
    } catch (error) {
        console.error(error)
    }
}