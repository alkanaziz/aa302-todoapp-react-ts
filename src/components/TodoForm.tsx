import { useState } from 'react'
import { TodoOperations } from '../utils'
import { PropTypes } from '../interfaces'

const TodoForm: React.FC<PropTypes> = ({ setTodos }) => {
  const [newTodoText, setNewTodoText] = useState<string>('')

  const handleAddTodo = () => {
    if (newTodoText.trim() !== '') {
      const updatedTodos = TodoOperations.addTodo(newTodoText)
      setTodos(updatedTodos)
      setNewTodoText('')
    }
  }

  return (
    <div>
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        autoFocus={true}
        placeholder="Add a new todo"
        className="rounded-lg bg-blue-200 p-2 text-white placeholder-blue-500"
      />
      <button onClick={handleAddTodo} className="">
        Add Todo
      </button>
    </div>
  )
}
export default TodoForm
