import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NEWANECDT':
      return 'New note added :' + action.payload
    case 'VOTED':
      return 'Voted for ' + action.payload.content
    case 'HIDE':
      return ''
    case 'ERROR':
      return 'Error ' + action.payload
    default:
      return ''
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, dispatchNotification] = useReducer(
    notificationReducer,
    '',
  )

  return (
    <NotificationContext.Provider
      value={{ notification, dispatchNotification }}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
