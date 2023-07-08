import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from 'react-query'
import axios from 'axios'

const App = () => {
  const result = useQuery(
    'notes',
    () => axios.get('http://localhost:3001/anecotes').then(res => res.data)
  )
  console.log(result)

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const anecdotes = result.data

  if (result.isLoading) return <>loading data...</>
  if(result.isError) return <>anecdote service not available due to problems in server</>

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
