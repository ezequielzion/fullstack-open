const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier is called "id"', async () => {
  const response = await api.get('/api/blogs')
  const blogToView = response.body[0]
  expect(blogToView.id).toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: "newBlogBeingTested",
    author: "newAuthor",
    url: "url.net",
    likes: 1000
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain("newBlogBeingTested")
})

test('if no likes are added, it will default to 0', async () => {
  const newBlogNoLikes = {
    title: "newBlogNoLikes",
    author: "newAuthorNoLikes",
    url: "url.net",
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlogNoLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const addedBlog = response.body
  expect(addedBlog.likes).toBe(0)
})

test('if no title or url are added, return 400', async () => {
  const newBlogNoTitleNoURL = {
    author: "newAuthor",
    likes: 10
  }

  const newBlogNoTitle = {
    author: "newAuthor",
    likes: 10,
    url: "url.net"
  }

  const newBlogNoURL = {
    title: "newTitle",
    author: "newAuthor",
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlogNoTitleNoURL)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(newBlogNoTitle)
    .expect(400)
    
  await api
    .post('/api/blogs')
    .send(newBlogNoURL)
    .expect(400)
})

test('succeeds at deleting with status code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const contents = blogsAtEnd.map(b => b.title)

  expect(contents).not.toContain(blogToDelete.title)
})

test('a blog can be updated ', async () => {
  const TITLE = 'This is the title for the edited blog'
  const LIKES = 55
  const blogsAtStart = await helper.blogsInDb()
  const blogToEdit = blogsAtStart[0]

  const editedBlog = {
    ...blogToEdit,
    title: TITLE,
    likes: LIKES
  }

  const response = await api
    .put(`/api/blogs/${blogToEdit.id}`)
    .send(editedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)


  expect(response.body.id).toBe(blogToEdit.id)
  expect(response.body.url).toBe(blogToEdit.url)
  expect(response.body.author).toBe(blogToEdit.author)

  expect(response.body.title).toBe(TITLE)
  expect(response.body.likes).toBe(LIKES)
})

afterAll(() => {
    mongoose.connection.close()
})