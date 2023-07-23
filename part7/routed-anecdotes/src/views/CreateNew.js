import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

export const CreateNew = (props) => {
    const navigate = useNavigate()
    const [content, resetContent] = useField('content')
    const [author, resetAuthor] = useField('author')
    const [info, resetInfo] = useField('content')
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      props.setNotification(`a new anecdote ${content.value} created!`)
      navigate('/')
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button>create</button>
          <button
            type="button" 
            onClick={() => {
              resetContent()
              resetAuthor()
              resetInfo()
            }}
          >
            reset
          </button>
        </form>
      </div>
    )
}