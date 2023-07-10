import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQueryClient, useQuery } from 'react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import { useContext } from 'react'
import Context from './Context'


const App = () => {
  const [state, dispatch] = useContext(Context)

  const queryClient = useQueryClient()
  const result = useQuery('anecdotes', getAnecdotes)
  
  const newAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    dispatch({type: 'NOTIFICATION__VOTE', payload: newAnecdote.content})
    newAnecdoteMutation.mutate(newAnecdote)
  }

  if (result.isLoading) return <>loading data...</>
  if(result.isError) return <>anecdote service not available due to problems in server</>
  const anecdotes = result.data

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
