import { useState } from 'react'
import { TodoTypes } from '../interfaces'
import { TodoOperations } from '../utils'
import TodoForm from './TodoForm'

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
    if (!editedTodoText.trim()) {
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
            <h1>No added todos, yet!</h1>
        ) : (
            <div>Todo</div>
        )}
      </ul>
    </div>
  )
}
export default TodoList
