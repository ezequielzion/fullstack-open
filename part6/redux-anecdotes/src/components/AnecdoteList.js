import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const unsortedAnecdotes = useSelector(({anecdotes, filter}) => {
    if (filter === '') return anecdotes
    return anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )})
  const displayAnecdotes = [...unsortedAnecdotes]
  displayAnecdotes.sort((a, b) => b.votes - a?.votes);
  
  const vote = (id) => {
    const { content: votedAnecdote } = displayAnecdotes.find(anecdote => anecdote.id === id)
    dispatch(setNotification(`You voted for '${votedAnecdote}'`, 5))
    dispatch(voteAnecdote(id))
  }

  return(
    <>
        {displayAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                  {anecdote.content}
              </div>
              <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
        )}
    </>
  )
}

export default AnecdoteList