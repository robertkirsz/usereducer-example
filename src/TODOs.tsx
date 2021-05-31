import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useStore } from 'store'

export default function TODOs() {
  const { todos, dispatch } = useStore()
  const [todoText, setTodoText] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (todoText === '') return

    dispatch.addTodo(todoText)
    setTodoText('')
  }

  const deleteTodo = (id: number) => () => {
    dispatch.deleteTodo(id)
  }

  return (
    <form className="TODOs" onSubmit={handleSubmit}>
      <input placeholder="What you wanna do?" value={todoText} onChange={handleChange} />

      {todos.map(todo => (
        <div key={todo.id}>
          {todo.text}{' '}
          <button type="button" onClick={deleteTodo(todo.id)}>
            x
          </button>
        </div>
      ))}
    </form>
  )
}
