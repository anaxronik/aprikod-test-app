import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'

import { Store } from '../store/index'
import { Todo, TodoType } from '../store/Todo'

export interface IAppProps {
  store: Store
}

function App({ store }: IAppProps) {
  const [title, setTitle] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [activeTypes, setActiveTypes] = useState<TodoType[]>([])
  const [filters, setFilters] = useState<TodoType[]>([])

  let filteredTodos: Todo[] = []
  if (filters.length) {
    filters.forEach((filter) => {
      store.todoStore.todos.forEach((todo) => {
        todo.types.forEach((type) => {
          if (
            type.id === filter.id &&
            filteredTodos.filter((t) => t.id === todo.id).length === 0
          ) {
            filteredTodos.push(todo)
          }
        })
      })
    })
  } else {
    filteredTodos = [...store.todoStore.todos]
  }

  function addTodo() {
    if (title.length > 0) {
      store.todoStore.create(title, text, activeTypes)
      setTitle('')
      setText('')
      setActiveTypes([])
    }
  }

  return (
    <div className="container">
      <h2 className="page-title">Список дел</h2>
      <div className="add-todo">
        <h3 className="add-todo__header">Добавить дело</h3>
        <div className="add-todo__block">
          <label className="add-todo__label" htmlFor="title">
            Название дела (не может быть пустым)
          </label>
          <input
            className="add-todo__title"
            type="text"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            onKeyPress={(e) => {
              if (e.ctrlKey && e.key === 'Enter') {
                addTodo()
              }
            }}
          />
        </div>

        <div className="add-todo__block">
          <label className="add-todo__label" htmlFor="description">
            Описание
          </label>
          <textarea
            className="add-todo__textarea"
            name="description"
            value={text}
            onChange={(e) => {
              setText(e.target.value)
            }}
            onKeyPress={(e) => {
              if (e.ctrlKey && e.key === 'Enter') {
                addTodo()
              }
            }}
          ></textarea>
        </div>

        <div className="add-todo__block">
          <label className="add-todo__label" htmlFor="types">
            Тип дела
          </label>
          <div className="add-todo__types">
            {activeTypes.map((type) => (
              <span
                className="type"
                key={type.id}
                onClick={(e) => {
                  setActiveTypes([
                    ...activeTypes.filter((t) => t.id !== type.id),
                  ])
                }}
              >
                {type.title}
              </span>
            ))}
          </div>
        </div>

        <div className="add-todo__block">
          <div className="add-todo__add-type">
            <span>Добавить</span>
            <input
              type="text"
              value={type}
              onChange={(e) => {
                setType(e.target.value)
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const newType = store.todoStore.createType(type)
                  setType('')
                }
                if (e.ctrlKey && e.key === 'Enter') {
                  addTodo()
                }
              }}
            />
          </div>
          <div className="add-todo__types">
            {store.todoStore.todoTypes.map((type) => (
              <span
                className="type"
                key={type.id}
                onClick={(e) => {
                  if (
                    activeTypes.filter((t) => t.id === type.id).length === 0
                  ) {
                    setActiveTypes([...activeTypes, type])
                  }
                }}
              >
                {type.title}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    store.todoStore.removeType(type.id)
                  }}
                >
                  X
                </button>
              </span>
            ))}
          </div>
        </div>

        <button className="add-todo__add-button" onClick={addTodo}>
          Добавить задачу (ctrl + Enter)
        </button>
      </div>

      <div className="todo-list">
        <h3 className="todo-list__header">
          Список дел (всего {store.todoStore.totalTodos} шт.)
        </h3>

        {filters.length ? (
          <div>
            <h4>Показанны только</h4>
            <div>
              {filters.map((type) => (
                <span className="type" key={type.id}>
                  {type.title}
                  <button
                    onClick={(e) => {
                      setFilters([...filters.filter((f) => f.id !== type.id)])
                    }}
                  >
                    X
                  </button>
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {filteredTodos.map((todo) => (
          <div
            className={
              todo.completed ? 'todo-item todo-item--complete' : 'todo-item'
            }
            key={todo.id}
          >
            <div className="todo-item__header">
              <span className="todo-item__status">
                {todo.completed ? 'Готово' : 'В процессе'}
              </span>
              <span className="todo-item__title">{todo.title}</span>
            </div>

            <p className="todo-item__text">{todo.text}</p>
            <div className="todo-item__types">
              {todo.types.map((type) => (
                <span
                  className="type"
                  key={type.id}
                  onClick={(e) => {
                    if (filters.filter((t) => t.id === type.id).length === 0) {
                      setFilters([...filters, type])
                    }
                  }}
                >
                  {type.title}
                </span>
              ))}
            </div>
            <div className="todo-item__footer">
              <span
                className="todo-item__btn"
                onClick={(e) => {
                  todo.toggleCompleted()
                }}
              >
                {todo.completed ? 'Возобновить' : 'Завершить'}
              </span>
              <span
                className="todo-item__btn"
                onClick={(e) => {
                  store.todoStore.remove(todo.id)
                }}
              >
                Удалить
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default observer(App)
