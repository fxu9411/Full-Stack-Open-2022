import Filter from './components/Filter'
import Notification from './components/Notification'
import AnecdoteForm from './controller/AnecdoteForm'
import AnecdoteList from './controller/AnecdoteList'


const App = () => {
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