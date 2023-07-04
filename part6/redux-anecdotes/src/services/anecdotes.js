import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const {data} = await axios.get(baseUrl)
  return data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const {data} = await axios.post(baseUrl, object)
  return data 
}

const voteAnecdote = async (id) => {
  const { data: anecdoteToVote } = await axios.get(`${baseUrl}/${id}`)
  anecdoteToVote.votes = anecdoteToVote.votes + 1
  const { data: votedAnecdote } = await axios.put(`${baseUrl}/${id}`, anecdoteToVote)
  return votedAnecdote
}

export default { getAll, createNew, voteAnecdote }