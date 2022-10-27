import { createStore } from 'redux'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

const App = () => {
  return (
    <div>
      <ul>
        {store.getState().map(note =>
          <li key={note.id}>{note.content} <strong>{note.important ? 'Important' : ''}</strong></li>)}
      </ul>
    </div>
  )
}

export default App