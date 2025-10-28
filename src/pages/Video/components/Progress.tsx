import React from 'react'
import { useSelector } from 'react-redux'
import { type VideoProgressPropsInterface, type VideoProgressInterface, initialState } from '../../../_domain/video/reducers/VideoProgress'

const Progress = () => {
  const vp = useSelector((state: VideoProgressPropsInterface): VideoProgressInterface => state.VideoProgress === undefined ? initialState : state.VideoProgress)
  const entries = Object.entries(vp.byId || {})

  if (entries.length === 0) return <div className='text-sm text-gray-400 ml-2'>No active jobs</div>

  return (
    <div className='space-y-2'>
      {entries.map(([id, v]) => (
        <div key={id} className='ml-2'>
          <div className='flex justify-between text-xs text-gray-400 mb-1'>
            <span>ID: {id}</span>
            <span>{v.status} {typeof v.progress === 'number' ? `${v.progress}%` : ''}</span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-neutral-700'>
            <div className='bg-blue-600 h-2.5 rounded-full' style={{ width: `${Math.max(0, Math.min(100, v.progress ?? 0))}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Progress
