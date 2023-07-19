import React from 'react'
import { Link } from 'react-router-dom'

export const Anecdote = ({ anecdote }) => (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      has {anecdote.votes} votes
      <br/>
      <>
        for more info see <Link to={anecdote.info}>{anecdote.info}</Link>
      </>
    </div>
)