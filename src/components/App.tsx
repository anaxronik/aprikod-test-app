import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'

import { Store } from '../store/index'
import { Todo, TodoType } from '../store/Todo'
import AddTodo from './AddTodo'
import TodoListBlock from './TodoListBLock'

export interface IAppProps {
  store: Store
}

function App({ store }: IAppProps) {
  return (
    <div className="container">
      <h2 className="page-title">Список дел</h2>
      <AddTodo store={store} />
      <TodoListBlock store={store} />
    </div>
  )
}

export default observer(App)
