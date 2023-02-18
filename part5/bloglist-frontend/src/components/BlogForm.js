import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()

        createBlog({
            title: title,
            author: author,
            url: url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
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
        </div>
    )
}

export default BlogForm