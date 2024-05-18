import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SocketHelper } from '../../_domain/socket/helper/socket.helper'

export interface WebSocket {
    next    : string,
}

export const SocketHook = (state: WebSocket) => {
    const dispatch = useDispatch();
    useEffect(() => {
        SocketHelper.call().conn();
        SocketHelper.call().listen((data: any) => {
            if (data.job === 'connection') {
                dispatch({
                    type    : 'Socket/setMyId',
                    myId    : data.id,
                });
            } else {
                dispatch({
                    type    : state.next,
                    data    : data.data,
                });
            }
        })
    }, [])

    return {message: ''}
}

export default SocketHook