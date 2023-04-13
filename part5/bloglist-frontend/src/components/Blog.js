import { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {
        showDetails ?
          (
            <div className='blog'>
              <div>
                <p>{blog.title}</p>
                <p>{blog.author}</p>
                <button onClick={() => setShowDetails(!showDetails)}>Hide</button>
              </div>
              <a href={`https://${blog.url}`} target="_blank" rel="noreferrer" id='url'>
                {blog.url}
              </a>
              <div id='likes'>
                {blog.likes}
                <button onClick={() => addLike(blog)}>Like</button>
              </div>
              <div>
                {blog.user.name}
              </div>
              {user.username === blog.user.username ? (
                <div>
                  <button onClick={deleteBlog}>
                    Remove
                  </button>
                </div>
              ) : null}
            </div>
          )
          :
          (
            <div>
              <p>{blog.title}</p>
              <p>{blog.author}</p>
              <button onClick={() => setShowDetails(!showDetails)}>Show</button>
            </div>
          )
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user:PropTypes.object.isRequired
}

export default Blog