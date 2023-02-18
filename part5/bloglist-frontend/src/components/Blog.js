import { useState } from "react";

const Blog = ({blog}) => {
  const [showDetails, setShowDetails] = useState(false);

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
            <div>
              <div>
                {blog.title} {blog.author}
                <button onClick={() => setShowDetails(!showDetails)}>Hide</button>
              </div>
              <a href={`https://${blog.url}`} target="_blank" rel="noreferrer">
                {blog.url}
              </a>
              <div>
                {blog.likes}
                <button>Like</button>
              </div>
              <div>
                {blog.user.name}
              </div>
            </div>
          )
        :
          (
            <div>
                {blog.title} {blog.author}
              <button onClick={() => setShowDetails(!showDetails)}>Show</button>
            </div>
          )
      }
    </div>
  )
}

export default Blog