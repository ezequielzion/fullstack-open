import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)

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

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

        setTitle('')
        setAuthor('')
        setUrl('')
        
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

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <h2>Create new blog</h2>
      <p>
        Title:
        <input 
          value={title} 
          onChange={({target}) => setTitle(target.value)}
        />
      </p>
      <p>
        Author:
        <input 
          value={author} 
          onChange={({target}) => setAuthor(target.value)}
        />
      </p>
      <p>
        Url:
        <input 
          value={url} 
          onChange={({target}) => setUrl(target.value)}
        />
      </p>
      <button type="submit">save</button>
    </form>
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
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App