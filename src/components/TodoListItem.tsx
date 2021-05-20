import React from 'react'
import { Todo } from '../store/Todo'
import TypeButton from './TypeButton'
import { observer } from 'mobx-react-lite'

export interface ITodoListItemProps {
  todo: Todo
  addFilter: (id: string) => void
  onRemoveClick: () => void
}

function TodoListItem({ todo, addFilter, onRemoveClick }: ITodoListItemProps) {
  return (
    <div
      className={todo.completed ? 'todo-item todo-item--complete' : 'todo-item'}
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
        {todo.types.map((t) => (
          <TypeButton
            key={t.id}
            title={t.title}
            onClick={() => addFilter(t.id)}
          />
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
        <span className="todo-item__btn" onClick={() => onRemoveClick()}>
          Удалить
        </span>
      </div>
    </div>
  )
}

export default observer(TodoListItem)
