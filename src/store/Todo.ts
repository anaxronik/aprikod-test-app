import { makeAutoObservable } from 'mobx'
import { Store } from './index'

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

export class Todo {
  id: string
  title: string
  text: string
  completed: boolean = false
  types: TodoType[] = []

  constructor(title: string, text: string, types: TodoType[]) {
    makeAutoObservable(this)
    this.id = Math.random().toString()
    this.title = title
    this.text = text
    this.types = types
  }

  toggleCompleted() {
    this.completed = !this.completed
  }

  edit(title: string, text: string) {
    this.title = title
    this.text = text
  }
}

export class TodoType {
  id: string
  title: string = ''

  constructor(text: string) {
    this.id = Math.random().toString()
    this.title = text
  }
}
