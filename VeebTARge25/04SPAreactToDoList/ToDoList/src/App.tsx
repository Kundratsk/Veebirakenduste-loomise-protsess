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
//useState on reacti hook, mis võimaldab meil lisada komponentidele olekut
//see tagastab massiivi, kus esimene element on praegune olek ja teine
//Element on funktsioon, mida saab kasutada oleku värskendamiseks

const addToDo = () => {
  if (!newToDo.trim()) return; //ignore empty tasks
  setToDos([...toDos, { id: Date.now(), text: newToDo.trim(), completed: false}]);
  // Date.now() anna meile unikaalse ID, mis põhineb pragusest ajast
  //ToDos tähendab, et me võtame olemasolevad ülesanded ja lisame uue ülesande massiivi lõppu
  //newToDo.trim eemdaldab tühikud testi algusest ja lõpust, et vältida tühjade ülesannete lisamist
  // completed: false tähendab, et uus ülesanne on algselt lõpetamata.
  setNewToDo('');
  //pärast uue ülesande lisamist tühjendame sisendvälja, et kasutaja saaks kohe uue ülesande lisada
};

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
      <ul className="todo-list">
        {toDos.map(toDo => (
          <ToDoItem
            key={toDo.id}
            toDo={toDo}
              toggleToDo={toggleToDo}
              deleteToDo={deleteToDo}
              />       
        ))}
      </ul>
    </div>
  )
//}
}
export default App
