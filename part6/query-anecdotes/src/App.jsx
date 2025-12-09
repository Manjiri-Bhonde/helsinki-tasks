import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notifications from './components/Notification'
import {
  createNewAnecdote,
  getAll,
  voteForAnaecdote,
} from './services/anecdotes'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {
  const { dispatchNotification } = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createNewAnecdote,
    onSuccess: (newAncedote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAncedote))
    },
    onError: (error) => {
      dispatchNotification({ type: 'ERROR', payload: error.message })
      setTimeout(() => dispatchNotification({ type: 'HIDE' }), 5000)
    },
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: voteForAnaecdote,
    onSuccess: (res) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const modifiedData = anecdotes.map((ancdt) => {
        if (ancdt.id === res.id) {
          return res
        } else {
          return ancdt
        }
      })
      queryClient.setQueryData(['anecdotes'], modifiedData)
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate(anecdote)
    dispatchNotification({ type: 'VOTED', payload: anecdote })
    setTimeout(() => {
      dispatchNotification({
        type: 'HIDE',
      })
    }, [5000])
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1,
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  if (!result.isLoading && result.status === 'error') {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notifications />
      <AnecdoteForm
        newAnecdoteMutation={newAnecdoteMutation}
        updateAnecdoteMutation={updateAnecdoteMutation}
      />

      <>
        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </>
    </div>
  )
}

export default App
