import React, { JSX } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type VideoListPropsInterface, type VideoListInterface, initialState } from '../../../_domain/video/reducers/VideoList'

export const ListVideo = (): JSX.Element => {
  const dispatch = useDispatch()
  const list = useSelector((state: VideoListPropsInterface): VideoListInterface => state.VideoList === undefined ? initialState : state.VideoList)

  return (
    <div className='
      w-full ml-6 mt-4
      bg-gray-800 rounded-lg
      overflow-y-auto overflow-x-hidden
      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-2
    '>
      {list.items.length === 0 ? (<div className='text-gray-400 p-4'>No videos yet</div>) : list.items.map((it) => (
        <div key={it.id} className='bg-gray-900 rounded-lg p-2 border border-gray-700'>
          <div className='text-gray-300 text-xs mb-1'>ID: {it.id}</div>
          <div className='h-40 flex items-center justify-center text-gray-500 border border-dashed border-gray-700 rounded mb-2'>
            {it.status}
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-xs text-gray-400'>status: {it.status}</span>
            <div className='flex gap-2'>
              <button
                className='py-1 px-2 text-xs rounded border border-gray-600 text-gray-200 hover:border-blue-500 hover:text-blue-400'
                onClick={() => dispatch({ type: 'VideoAction/get', id: it.id })}
              >Refresh</button>
              <button
                className='py-1 px-2 text-xs rounded border border-gray-600 text-gray-200 hover:border-green-500 hover:text-green-400'
                onClick={() => dispatch({ type: 'VideoAction/download', id: it.id, filename: `video-${it.id}.mp4` })}
                disabled={it.status !== 'completed'}
              >Download</button>
              <button
                className='py-1 px-2 text-xs rounded border border-red-600 text-red-300 hover:bg-red-700 hover:text-white'
                onClick={() => dispatch({ type: 'VideoAction/delete', id: it.id })}
              >Delete</button>
            </div>
          </div>
          <div className='mt-2 grid grid-cols-2 gap-1 text-[10px] text-gray-400'>
            {it.model ? <div>model: {it.model}</div> : null}
            {typeof it.progress === 'number' ? <div>progress: {it.progress}%</div> : null}
            {it.seconds ? <div>seconds: {it.seconds}</div> : null}
            {it.size ? <div>size: {it.size}</div> : null}
          </div>
          {it.error?.message ? (
            <div className='mt-2 text-xs text-red-400'>Error: {it.error.message}</div>
          ) : null}
        </div>
      ))}
    </div>
  )
}

export default ListVideo
