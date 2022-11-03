import Filter from './components/Filter'
import Notification from './components/Notification'
import AnecdoteForm from './controller/AnecdoteForm'
import AnecdoteList from './controller/AnecdoteList'
import { setAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'

import { useDispatch } from 'react-redux'
import { useEffect } from 'react'


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App