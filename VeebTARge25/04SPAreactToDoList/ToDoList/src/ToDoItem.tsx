type ToDo = {
    id: number;
    text: string;
    completed: boolean;
  }

  type Props = {
    toDo: ToDo;
    toggleToDo: (id: number) => void;
    deleteToDo: (id:number) => void;
  };
//ToDoItem on komponent, mis esindab ühte ülesannet To-Do listis
//React.FC funktsionaalne komponent
//Propsid on objektid, mis sisaldavad andmeid ja funktsioone mida komponent saab kasutada
  const ToDoItem: React.FC<Props> = ({ toDo, toggleToDo, deleteToDo}) => {
    return (
        <li className={`todo-item ${toDo.completed ? 'completed' : ''}`}>
            <span onClick={() => toggleToDo(toDo.id)}>{toDo.text}</span>
            <button onClick={() => deleteToDo(toDo.id)}>Delete</button>
        </li>
    );
  };

  export default ToDoItem;