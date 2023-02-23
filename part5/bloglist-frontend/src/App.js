import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 
      setUser(user)
      
      setUsername('')
      setPassword('')
      
      setNotification({message: 'Login successful', isError: false})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification({message: 'Wrong credentials', isError: true})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = blogObject => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        returnedBlog = {...returnedBlog, user: user}
        setBlogs(blogs.concat(returnedBlog))
        setNotification({
          message: `${returnedBlog.title} by ${returnedBlog.author} was added to the server`,
          isError: false
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(() => {
        setNotification({
          message: `There was an error adding the note to the server`,
          isError: true
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const addLike = async (indexOfUpdatedBlog, blogToUpdate) => {
    const data = {
      title: blogToUpdate.title,
      url: blogToUpdate.url,
      author: blogToUpdate.author,
      user: blogToUpdate.user.id,
      likes: blogToUpdate.likes + 1
    }

    let updatedBlog = await blogService.update(data, blogToUpdate.id)
    updatedBlog = {...updatedBlog, user: user}

    let _blogs = structuredClone(blogs)
    _blogs[indexOfUpdatedBlog] = updatedBlog
    setBlogs(_blogs)
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification notification={notification} />
      {!user && loginForm()} 
      {user && 
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
          {blogs.map((blog, index) =>
            <Blog key={blog.id} blog={blog} addLike={blog => addLike(index, blog)}/>
          )}
        </div>
      }
    </div>
  )
}

export default App