import React from 'react'
import { Todo } from '../store/Todo'
import TodoListItem from './TodoListItem'
import { observer } from 'mobx-react-lite'

export interface ITodoListProps {
  todos: Todo[]
  addFilter: (id: string) => void
  removeTodo: (id: string) => void
}
function TodoList({ todos, addFilter, removeTodo }: ITodoListProps) {
  return (
    <>
      {todos.map((t) => (
        <TodoListItem
          key={t.id}
          todo={t}
          addFilter={(id) => {
            addFilter(id)
          }}
          onRemoveClick={() => {
            removeTodo(t.id)
          }}
        />
      ))}
    </>
  )
}

export default observer(TodoList)
