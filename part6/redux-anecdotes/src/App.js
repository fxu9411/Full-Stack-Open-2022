import AnecdoteForm from './controller/AnecdoteForm'
import AnecdoteList from './controller/AnecdoteList'


const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App