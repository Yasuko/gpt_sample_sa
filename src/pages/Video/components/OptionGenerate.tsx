import React, { JSX, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type VideoOptionPropsInterface, type VideoOptionInterface, initialState } from '../../../_domain/video/reducers/VideoOption'

// ローカルプレビュー用（store には File を保存し、base64 は保持しない）
const createPreviewUrl = (file: File): string => URL.createObjectURL(file)

export const OptionGenerate = (): JSX.Element => {
  const dispatch = useDispatch()
  const vo = useSelector((state: VideoOptionPropsInterface): VideoOptionInterface => {
    return state.VideoOption === undefined ? initialState : state.VideoOption
  })

  const [dragOver, setDragOver] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const onInputReferenceSelected = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const file = files[0]
    if (!file.type.startsWith('image/')) return
    // store には File を保存
    dispatch({ type: 'VideoOption/setInputReference', input_reference: file })
    // プレビューはローカル state で管理
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return createPreviewUrl(file)
    })
  }, [dispatch])

  const onDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
    const files = e.dataTransfer.files
    if (!files || files.length === 0) return
    const file = files[0]
    if (!file.type.startsWith('image/')) return
    dispatch({ type: 'VideoOption/setInputReference', input_reference: file })
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return createPreviewUrl(file)
    })
  }, [dispatch])

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(true)
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
  }, [])

  // アンマウント時にプレビューURLを解放
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  return (
    <div className='
      w-full mt-4
      grid grid-cols-2 gap4
    '>
      <div className='col-span-2'>
        <textarea
          cols={70}
          rows={4}
          className='w-full rounded m-2 mb-1 p-4 text-gray-500'
          id='video_prompt'
          placeholder='Input Generate Prompt'
          defaultValue={vo.prompt}
          onChange={(e) => dispatch({ type: 'VideoOption/setPrompt', prompt: e.target.value })}
        />
        <div
          className='
            ml-2 mr-4 py-2 px-4 inline-flex items-center gap-x-2
            text-sm font-medium text-white rounded-lg border border-transparent
            bg-blue-600 hover:bg-blue-700 focus:outline-none focus:bg-blue-700
            disabled:opacity-50 disabled:pointer-events-none
          '
          onClick={() => dispatch({ type: 'VideoAction/generate' })}
        >
          Generate
        </div>
      </div>

      <div className='ml-2 mt-1 leading-10'>model :</div>
      <div>
        <select
          className='py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
          value={vo.model}
          onChange={(e) => dispatch({ type: 'VideoOption/setModel', model: e.target.value })}
        >
          <option value='sora-2'>sora-2</option>
          <option value='sora-2-pro'>sora-2-pro</option>
        </select>
      </div>

      <div className='ml-2 mt-1 leading-10'>seconds :</div>
      <div>
        <input
          className='py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400'
          type='number'
          min={1}
          max={120}
          value={vo.seconds ?? ''}
          onChange={(e) => dispatch({ type: 'VideoOption/setSeconds', seconds: Number(e.target.value) || undefined })}
        />
      </div>

      <div className='ml-2 mt-1 leading-10'>size :</div>
      <div>
        <input
          className='py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400'
          type='text'
          placeholder='720x1280'
          value={vo.size ?? ''}
          onChange={(e) => dispatch({ type: 'VideoOption/setSize', size: e.target.value || undefined })}
        />
      </div>

      <div className='ml-2 mt-1 leading-10'>input_reference (image) :</div>
      <div>
        <input
          type='file'
          accept='image/*'
          className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none'
          onChange={onInputReferenceSelected}
        />
        <div
          className={`mt-2 w-full h-32 rounded border-2 ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300'} flex items-center justify-center text-xs text-gray-500`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
        >
          Drag & Drop image here
        </div>
        {previewUrl ? (
          <div className='mt-2'>
            <img src={previewUrl} alt='input_reference' className='w-24 h-24 object-contain rounded border border-gray-200' />
          </div>
        ) : null}
      </div>

    </div>
  )
}

export default OptionGenerate
