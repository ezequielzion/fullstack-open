import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import Context from '../Context'

const AnecdoteForm = () => {
  const [state, dispatch] = useContext(Context)
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if(content.length < 5){
      dispatch({type: 'NOTIFICATION__ERROR_SHORT_ANECDOTE'})
    } else {
      newAnecdoteMutation.mutate({ content, votes: 0 })
      dispatch({type: 'NOTIFICATION__CREATION', payload: content})
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
