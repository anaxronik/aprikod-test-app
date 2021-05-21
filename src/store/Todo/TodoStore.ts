import { makeAutoObservable } from 'mobx'

import { Store } from '..'
import { Todo } from './Todo'
import { TodoType } from './TodoType'

export class TodoStore {
  defaultTodoTypes = [new TodoType('Важное'), new TodoType('Приятное')]
  rootStore

  todos: Todo[] = [
    new Todo('Создать новую задачу', 'Удалить эту задачу и создать новую', [
      this.defaultTodoTypes[0],
    ]),
    new Todo('Нажать на тип задачи', 'Увидеть как задачи фильтруются по типу', [
      this.defaultTodoTypes[1],
    ]),
    new Todo('Нажать все кнопки', 'Увидеть как они работают', [
      this.defaultTodoTypes[0],
      this.defaultTodoTypes[1],
    ]),
  ]
  types: TodoType[] = this.defaultTodoTypes
  filters: TodoType[] = []

  constructor(rootStore: Store) {
    makeAutoObservable(this, {
      //disable from observe
      rootStore: false,
    })
    this.rootStore = rootStore
  }

  create(title: string, text: string, types: TodoType[] = []): Todo {
    const todo = new Todo(title, text, types)
    this.todos.push(todo)
    return todo
  }

  get totalCountTodos(): number {
    return this.todos.length
  }

  get filtredTodos(): Todo[] {
    if (this.filters.length !== 0) {
      let todos: Todo[] = []

      this.filters.forEach((filter) => {
        this.todos.forEach((todo) => {
          todo.types.forEach((type) => {
            if (
              type.id === filter.id &&
              todos.filter((td) => td.id === todo.id).length === 0
            ) {
              todos.push(todo)
            }
          })
        })
      })

      return todos
    }

    return this.todos
  }

  get filteredTodoCount() {
    return this.filtredTodos.length
  }

  remove(id: string) {
    this.todos = this.todos.filter((t) => t.id !== id)
  }

  removeType(id: string) {
    this.types = this.types.filter((t) => t.id !== id)
  }

  createType(title: string) {
    const type = new TodoType(title)
    this.types.push(type)
  }

  addFilter(id: string) {
    const filter = this.types.filter((t) => t.id === id)
    if (
      filter.length !== 0 &&
      this.filters.filter((f) => f.id === id).length === 0
    ) {
      this.filters.push(filter[0])
    }
  }

  removeFilter(id: string) {
    this.filters = this.filters.filter((f) => f.id !== id)
  }
}
