import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import ListImage from '../ListImage'

const mockStore = configureStore([])

describe('ListImage Component', () => {
  let store: any

  it('画像が0件の場合、空のリストが表示される', () => {
    store = mockStore({
      ImageList: {
        images: []
      }
    })

    render(
      <Provider store={store}>
        <ListImage />
      </Provider>
    )

    const images = screen.queryAllByRole('img')
    expect(images).toHaveLength(0)
  })

  it('画像がある場合、正しく表示される', () => {
    const mockImages = [
      {
        prompt: 'test prompt 1',
        image: 'test-image-1.jpg'
      },
      {
        prompt: 'test prompt 2',
        image: 'test-image-2.jpg'
      }
    ]

    store = mockStore({
      ImageList: {
        images: mockImages
      }
    })

    render(
      <Provider store={store}>
        <ListImage />
      </Provider>
    )

    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(2)
    expect(images[0]).toHaveAttribute('src', 'test-image-1.jpg')
    expect(images[0]).toHaveAttribute('alt', 'test prompt 1')
    expect(images[1]).toHaveAttribute('src', 'test-image-2.jpg')
    expect(images[1]).toHaveAttribute('alt', 'test prompt 2')
  })
}) 