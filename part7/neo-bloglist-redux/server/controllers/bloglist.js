const bloglistRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Blog = require('../models/blog')

bloglistRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

bloglistRouter.post('/', async (request, response) => {
  const { title, author, url } = request.body
  let { likes } = request.body

  if(!title || !url) response.status(400).end()

  const user = request.user
  
  if(!user){
    return response.status(401).json({ error: 'token invalid'})
  }

  if(!likes) likes = 0

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

bloglistRouter.delete('/:id', async (request, response) => {
  const user = request.user
  if(!user){
    return response.status(401).json({ error: 'token invalid'})
  }

  const blogToDelete = await Blog.findById(request.params.id)

  if(blogToDelete.user.toString() === user._id.toString()){
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(400).json({error: 'blog not created by this user'}).end()
  }
})

bloglistRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user
  }

  const updatedBlog =  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = bloglistRouter
