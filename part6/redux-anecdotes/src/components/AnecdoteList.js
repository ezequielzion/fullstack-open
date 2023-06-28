import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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