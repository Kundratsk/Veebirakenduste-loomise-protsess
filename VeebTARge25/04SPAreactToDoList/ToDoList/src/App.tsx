import React, { useState } from 'react'
import './App.css'

type ToDo = {
  id: number;
  text: string;
  completed: boolean;
}


const App: React.FC = () => {
  const [toDos, setToDos] = useState <ToDo[]>([]);
  const [newToDo, setNewToDo] = useState('');



//function App() {


  return (
    <div className="App">
      <h1>To-Do list</h1>
      <div className ="input-row">
        <input 
          type="text"
          value={newToDo}
          onChange={e => setNewToDo(e.target.value)}
          placeholder="Add a new task"
          onKeyDown={e => e.key === 'Enter' && addToDo ()} 
          />
          <button onClick={addToDo}>Add</button>
      </div>
    </div>
  )
//}
}
export default App
