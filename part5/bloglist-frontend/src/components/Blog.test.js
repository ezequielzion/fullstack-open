import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'This is the title',
    author: 'John Johnson',
    likes: 100,
    url: 'www.medium.com'
  }

  const mockHandler = jest.fn()

  const { container } = render(
    <Blog
      blog={blog}
      addLike={mockHandler}
      deleteBlog={mockHandler}
      user={{}}
    />
  )

  const title = screen.getByText('This is the title')
  expect(title).toBeDefined()

  const author = screen.getByText('John Johnson')
  expect(author).toBeDefined()

  const likes = container.querySelector('#likes')
  expect(likes).toBeNull()

  const url = container.querySelector('#url')
  expect(url).toBeNull()
})

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'This is the title',
    author: 'John Johnson',
    likes: 100,
    url: 'www.medium.com',
    user: { name: 'pepo', username: 'pepe' }
  }

  const mockHandler = jest.fn()

  render(
    <Blog
      blog={blog}
      addLike={mockHandler}
      deleteBlog={mockHandler}
      user={{ name: 'pepo', username: 'pepe' }}
    />
  )

  const user = userEvent.setup()
  const button = screen.getByText('Show')
  expect(button).toBeDefined()
  await user.click(button)

  const title = screen.getByText('This is the title')
  expect(title).toBeDefined()

  const author = screen.getByText('John Johnson')
  expect(author).toBeDefined()

  const url = screen.getByText('www.medium.com')
  expect(url).toBeDefined()

  const likes = screen.getByText(100)
  expect(likes).toBeDefined()

})