import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if(content.trim()) {
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch(notificationChange(`You created '${content}'`))
      dispatch(createAnecdote(newAnecdote))
    }
  }

  return (
    <>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button  type="submit">create</button>
        </form>
    </>
  )
}

export default AnecdoteForm