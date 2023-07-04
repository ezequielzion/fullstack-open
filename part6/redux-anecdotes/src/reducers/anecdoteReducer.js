import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    replaceAnecdote(state, action){
      const changedAnecdote = action.payload
      const {id} = changedAnecdote
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )  
    }
  },
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.voteAnecdote(id)
    dispatch(replaceAnecdote(votedAnecdote)) 
  }
}

export const { appendAnecdote, replaceAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer