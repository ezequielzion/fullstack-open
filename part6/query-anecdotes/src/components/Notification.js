import { useContext } from 'react'
import Context from '../Context'

const Notification = () => {
  const [state, dispatch] = useContext(Context)

  if(state.notification){
    setTimeout(() => {
      dispatch({type: 'NOTIFICATION__CLEAR'})
    }, 5000)
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={style}>
      {state.notification}      
    </div>
  )
}

export default Notification
