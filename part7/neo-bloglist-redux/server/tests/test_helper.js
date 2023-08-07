const User = require('../models/user')
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Why we need to abolish cars",
        author: "JOHNATAN JOHANNESBURG",
        url: "medium.com",
        likes: 123,
    },
    {
        title: "Why we need to abolish people who want to abolish cars",
        author: "SAMOTHY SAMINSON",
        url: "medium.com",
        likes: 123,
    },
]

const initialUsers = [
    {
      username: "testuser",
      name: "testname",
      passwordHash: "testpassword"
    },
    {
      username: "testuser2",
      name: "testname2",
      passwordHash: "testpassword2"
    }
]

const nonExistingId = async () => {
  const blog = new Blog({ 
    title: "willremovethissoon",
    author: "willremovethissoon",
    url: "willremovethissoon",
    likes: 123,
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, 
    nonExistingId,
    blogsInDb,
    initialUsers,
    usersInDb
}