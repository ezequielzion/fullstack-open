import { createContext, useReducer } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'NOTIFICATION__CREATION':
        return {
            ...state, 
            notification: `Anecdote ${action.payload} created`
        }
    case 'NOTIFICATION__VOTE':
        return {
            ...state, 
            notification: `Anecdote ${action.payload} voted`
        }
    case 'NOTIFICATION__ERROR_SHORT_ANECDOTE':
        return {
            ...state, 
            notification: `Too short anecdote, must have 5 characters or more`
        }
    case 'NOTIFICATION__CLEAR':
        return {
            ...state, 
            notification: ''
        }
    default:
        return state
  }
}

const Context = createContext()
const initialState = {
    notification: ''
}

export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Context.Provider value={[state, dispatch] }>
      {props.children}
    </Context.Provider>
  )
}

export default Context