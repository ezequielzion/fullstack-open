const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')

bloglistRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

bloglistRouter.post('/', async (request, response) => {
  const blogObj = request.body
  if(!blogObj.title || !blogObj.url) response.status(400).end()
  
  if(!blogObj.likes) blogObj.likes = 0
  const blog = new Blog(blogObj)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

bloglistRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = bloglistRouter
