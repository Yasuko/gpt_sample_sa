import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

// import helper
import {
    AudioVisualHelper
} from '../../_domain/_helper/AudioVisual.helper'

interface AudioInterface
{
    dispatch    : string,
}

const AudioHook = ((s: AudioInterface): any => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type    : 'Enter/setListen',
            listen  : false
        })
        AudioVisualHelper.call()
            .setCallback(
                // 音圧チェックコールバック登録
                (result: any) => {
                    if (result > -20) {
                        dispatch({
                            type    : s.dispatch,
                            result  : result
                        })
                    }
                },
                
                (wave: any) => {
                    dispatch({
                        type    : s.dispatch,
                        result  : new Object,
                        wave    : wave,
                    })
                }
            )
    }, [])

    return { message: false }
})

export default AudioHook
