import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationChange(state, action){
      return action.payload
    },
    clearNotification(state, action){
      return ''
    }
  }
})

export const setNotification = (notification, displayTime) => {
  return dispatch => {
    displayTime *= 1000
    dispatch(notificationChange(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, displayTime)
  }
}
  
export const { notificationChange, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer