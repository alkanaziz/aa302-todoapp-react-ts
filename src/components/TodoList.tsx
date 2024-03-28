import { useState } from 'react'
import { TodoTypes } from '../interfaces'
import { TodoOperations } from '../utils'
import { TodoForm } from '.'
import { FaCheck, FaEdit } from 'react-icons/fa'
import { GiCancel } from 'react-icons/gi'
import { RiDeleteBin5Fill } from 'react-icons/ri'

const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoOperations.getTodos())
  const [editTodoID, setEditTodoID] = useState<string | null>(null)
  const [editedTodoText, setEditedTodoText] = useState<string>('')

  const handleEditStart = (id: string, text: string) => {
    setEditTodoID(id)
    setEditedTodoText(text)
  }

  const handleEditCancel = () => {
    setEditTodoID(null)
    setEditedTodoText('')
  }

  const handleEditSave = (id: string) => {
    if (editedTodoText.trim() !== '') {
      const updatedTodo = TodoOperations.updateTodo({
        id,
        text: editedTodoText,
        completed: false,
      })
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      )
    }
    setEditTodoID(null)
    setEditedTodoText('')
  }

  const handleDelete = (id: string) => {
    TodoOperations.deleteTodo(id)
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  return (
    <div>
      <div>
        <TodoForm />
      </div>

      <ul>
        {todos.length === 0 ? (
          <h2>No added todos, yet!</h2>
        ) : (
          todos.map((todo) => (
            <div key={todo.id}>
              {editTodoID === todo.id ? (
                <div>
                  <input
                    type="text"
                    value={editedTodoText}
                    onChange={(e) => setEditedTodoText(e.target.value)}
                    autoFocus={true}
                  />
                  <div>
                    <button onClick={() => handleEditSave(todo.id)}>
                      <FaCheck />
                    </button>
                    <button>
                      <GiCancel onClick={() => handleEditCancel()} />
                    </button>
                    <button>
                      <RiDeleteBin5Fill onClick={() => handleDelete(todo.id)} />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>{todo.text}</p>
                  <div>
                    <button>
                      <FaEdit
                        onClick={() => handleEditStart(todo.id, todo.text)}
                      />
                    </button>
                    <button>
                      <RiDeleteBin5Fill onClick={() => handleDelete(todo.id)} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </ul>
    </div>
  )
}
export default TodoList
