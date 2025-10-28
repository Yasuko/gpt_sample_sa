import React from 'react'
import { useSelector } from 'react-redux'
import { type VideoListPropsInterface, type VideoListInterface, initialState } from '../../../_domain/video/reducers/VideoList'

const ErrorAlert = () => {
  const list = useSelector((state: VideoListPropsInterface): VideoListInterface => state.VideoList === undefined ? initialState : state.VideoList)
  const errors = (list.items || []).filter((it) => it.status === 'failed')

  if (errors.length === 0) return null

  return (
    <div className='ml-2 p-3 rounded border border-red-300 bg-red-50 text-red-700'>
      <div className='font-semibold mb-1 text-sm'>Errors</div>
      <ul className='text-xs list-disc list-inside space-y-1'>
        {errors.map((it) => (
          <li key={it.id}>
            <span className='font-mono'>[{it.id}]</span> {it.error?.message || it.status}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ErrorAlert
