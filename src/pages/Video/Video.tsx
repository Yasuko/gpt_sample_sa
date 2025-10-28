import React, { JSX, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// child components
import OptionGenerate from './components/OptionGenerate'
import OptionEdit from './components/OptionEdit'
import ListVideo from './components/ListVideo'
import Progress from './components/Progress'
import ErrorAlert from './components/ErrorAlert'

export const Video = (): JSX.Element => {
  const dispatch = useDispatch()
  const [mode, setMode] = useState<'generate' | 'edit'>('generate')
  // Token の初期化完了を監視してから一覧取得を行う
  const tokenForm = useSelector((state: any) => state.TokenForm)

  useEffect(() => {
    dispatch({
      type: 'TokenAction/checkToken',
      payload: { redirect: '/Video' }
    })
  }, [dispatch])

  // トークンが設定された後に一覧取得を実行する
  useEffect(() => {
    if (tokenForm?.initial && tokenForm?.token) {
      dispatch({ type: 'VideoAction/list', params: { limit: 20 } })
    }
  }, [dispatch, tokenForm?.initial, tokenForm?.token])

  return (
    <div className='
      grid grid-rows-3 grid-cols-3 gap4
      w-full h-[90vh]
    '>
      <div className='px-4 row-span-3 col-span-1'>
        <div className="form-row align-items-center">
          <h1 className='
            m-2
            text-4xl text-left
            text-gray-600
          '>Video</h1>
          <button
            className='
              ms-1 py-2 px-4 inline-flex items-center gap-x-2
              text-sm font-medium text-gray-500
              rounded-lg border border-gray-200
              hover:border-blue-600 hover:text-blue-600
              focus:outline-none focus:border-blue-600 focus:text-blue-600
              disabled:opacity-50 disabled:pointer-events-none
              dark:border-neutral-700 dark:text-neutral-400
              dark:hover:text-blue-500 dark:hover:border-blue-600
              dark:focus:text-blue-500 dark:focus:border-blue-600
            '
            onClick={() => setMode('generate')}
          >Generate</button>
          <button
            className='
              ms-4 py-2 px-4 inline-flex items-center gap-x-2
              text-sm font-medium text-gray-500
              rounded-lg border border-gray-200
              hover:border-blue-600 hover:text-blue-600
              focus:outline-none focus:border-blue-600 focus:text-blue-600
              disabled:opacity-50 disabled:pointer-events-none
              dark:border-neutral-700 dark:text-neutral-400
              dark:hover:text-blue-500 dark:hover:border-blue-600
              dark:focus:text-blue-500 dark:focus:border-blue-600
            '
            onClick={() => setMode('edit')}
          >Edit</button>
        </div>
        {mode === 'generate' ? <OptionGenerate /> : <OptionEdit />}
        <div className='mt-4'>
          <Progress />
        </div>
        <div className='mt-2'>
          <ErrorAlert />
        </div>
      </div>
      <div className='row-span-3 col-span-2'>
        <ListVideo />
      </div>
    </div>
  )
}

export default Video
