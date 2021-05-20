import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'

import { Store } from '../store'
import { TodoType } from '../store/Todo'
import TodoFilter from './TodoFilter'
import TodoList from './TodoList'

export interface ITodoListProps {
  store: Store
}

function TodoListBlock({ store }: ITodoListProps) {
  const [filters, setFilters] = useState<TodoType[]>([])

  return (
    <div className="todo-list">
      <h3 className="todo-list__header">
        Список дел (всего {store.todoStore.totalCountTodos} шт.)
      </h3>

      <TodoFilter
        filters={store.todoStore.filters}
        removeFilter={(id) => store.todoStore.removeFilter(id)}
        filteresTodoCount={store.todoStore.filteredTodoCount}
      />
      <TodoList
        todos={store.todoStore.filtredTodos}
        addFilter={(id) => {
          store.todoStore.addFilter(id)
        }}
        removeTodo={(id) => {
          store.todoStore.remove(id)
        }}
      />
    </div>
  )
}

export default observer(TodoListBlock)
