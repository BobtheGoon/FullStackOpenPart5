import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('<Blog/>', () => {
  let container

  const blog = {
    title: 'Testing blog',
    author: 'Jest testing',
    url: 'JestTest.com',
    likes: 0,
    user: {
      username: 'Jest',
      name: 'Jest Tester',
    }
  }

  beforeEach(() => {
    container = render(
      <Blog blog={blog}></Blog>
    )
  })

  test('renders blog title', () => {
    screen.getByText('Testing blog')
  })

  test('likes and url are displayed when show more is clicked', async () => {
    const mockHandler = jest.fn()

    const user = userEvent.setup()
    const button = screen.getByText('Show more')
    await user.click(button)

    screen.getByText('Jest')
    screen.getByText('JestTest.com')
    screen.getByText('Be the first to like this post!')    
  })
})

