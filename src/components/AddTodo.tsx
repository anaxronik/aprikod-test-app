import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'

import { Store } from '../store/index'
import { TodoType } from '../store/Todo/Todo'
import Input from './Input'
import TextArea from './TextArea'
import TodoTypes from './TodoTypes'

export interface IAddTodoProps {
  store: Store
}

function AddTodo({ store }: IAddTodoProps) {
  const [title, setTitle] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [selectedTypes, setSelectedTypes] = useState<TodoType[]>([])

  function addTodo() {
    if (title.length > 0) {
      store.todoStore.create(title, text, selectedTypes)
      setTitle('')
      setText('')
      setSelectedTypes([])
    }
  }

  return (
    <div
      className="add-todo"
      onKeyPress={(e) => {
        if (e.ctrlKey && e.key === 'Enter') {
          addTodo()
        }
      }}
    >
      <h3 className="add-todo__header">Добавить дело</h3>

      <div className="add-todo__block">
        <Input
          className="add-todo"
          label="Название дела (не может быть пустым)"
          name="title"
          value={title}
          onChange={setTitle}
        />
      </div>

      <div className="add-todo__block">
        <TextArea
          title="Описание"
          text={text}
          name="description"
          className="add-todo"
          onChange={(text) => setText(text)}
        />
      </div>

      <div className="add-todo__block">
        <TodoTypes
          types={store.todoStore.types}
          createNewType={(text) => {
            store.todoStore.createType(text)
          }}
          removeTodoType={(id) => {
            store.todoStore.removeType(id)
          }}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
        />
      </div>

      <button className="add-todo__add-button" onClick={addTodo}>
        Добавить задачу (ctrl + Enter)
      </button>
    </div>
  )
}

export default observer(AddTodo)
