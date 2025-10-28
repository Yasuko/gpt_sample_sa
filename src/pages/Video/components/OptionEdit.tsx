import React, { JSX } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type VideoEditOptionPropsInterface, type VideoEditOptionInterface, initialState } from '../../../_domain/video/reducers/VideoEditOption'

export const OptionEdit = (): JSX.Element => {
  const dispatch = useDispatch()
  const ve = useSelector((state: VideoEditOptionPropsInterface): VideoEditOptionInterface => {
    return state.VideoEditOption === undefined ? initialState : state.VideoEditOption
  })

  return (
    <div className='w-full mt-4 grid grid-cols-2 gap4'>
      <div className='col-span-2'>
        <textarea
          cols={70}
          rows={4}
          className='w-full rounded m-2 mb-1 p-4 text-gray-500'
          placeholder='Input Edit Prompt'
          defaultValue={ve.prompt}
          onChange={(e) => dispatch({ type: 'VideoEditOption/setPrompt', prompt: e.target.value })}
        />
        <div
          className='ml-2 mr-4 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium text-white rounded-lg border border-transparent bg-blue-600 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none'
          onClick={() => dispatch({ type: 'VideoAction/edit' })}
        >
          Edit
        </div>
      </div>

      <div className='ml-2 mt-1 leading-10'>video_id :</div>
      <div>
        <input
          className='py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400'
          type='text'
          placeholder='video_...'
          value={ve.video_id}
          onChange={(e) => dispatch({ type: 'VideoEditOption/setVideoId', video_id: e.target.value })}
        />
      </div>
    </div>
  )
}

export default OptionEdit
