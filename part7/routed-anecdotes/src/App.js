import { useEffect, useState } from 'react'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { AnecdoteList } from './views/AnecdoteList'
import { About } from './views/About'
import { CreateNew } from './views/CreateNew'
import { Footer } from './components/Footer'
import { Anecdote } from './views/Anecdote'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [notification, setNotification] = useState('')

  useEffect(() => {
    if (notification) {
      setTimeout(() => { setNotification('') }, 5000)
    }
  }, [notification])

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) => anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = {
    padding: 5
  }

  const match = useMatch('/anecdotes/:id')
  const anecdoteToDisplay = match 
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  return (
    <div>
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>
      <h1>Software anecdotes</h1>
      <>{notification ? notification : null}</>
      <Routes>
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdoteToDisplay}/>}
        />
        <Route 
          path="/create" 
          element={<CreateNew addNew={addNew} setNotification={setNotification}/>}
        />
        <Route 
          path="/about" 
          element={<About />} 
        />
        <Route 
          path="/" 
          element={<AnecdoteList anecdotes={anecdotes} />}
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
