import Notes from './Notes'
import NewNote from './NewNote'
import VisibilityFilter from './components/VIsibilityFilter'

const App = () => {
  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App