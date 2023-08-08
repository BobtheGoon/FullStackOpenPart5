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

})

