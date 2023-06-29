import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if(content) {
      dispatch(notificationChange(`You created '${content}'`))
      dispatch(createAnecdote(content))
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