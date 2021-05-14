import { makeAutoObservable } from 'mobx'
import { Store } from './index'

export class TodoStore {
  defaultTodoTypes = [new TodoType('Важное'), new TodoType('Приятное')]

  todos: Todo[] = [
    new Todo('Создать новую задачу', 'Удалить эту задачу и создать новую', [
      this.defaultTodoTypes[0],
    ]),
    new Todo('Нажать на тип задачи', 'Увидеть как задачи фильтруются по типу', [
      this.defaultTodoTypes[1],
    ]),
  ]
  rootStore
  todoTypes: TodoType[] = this.defaultTodoTypes

  constructor(rootStore: Store) {
    makeAutoObservable(this, {
      //disable from observe
      rootStore: false,
    })
    this.rootStore = rootStore
  }

  create(title: string, text: string, types: TodoType[] = []) {
    const todo = new Todo(title, text, types)
    this.todos.push(todo)
    return todo
  }

  get totalTodos(): number {
    return this.todos.length
  }

  remove(id: string) {
    this.todos = this.todos.filter((t) => t.id !== id)
  }
  removeType(id: string) {
    this.todoTypes = this.todoTypes.filter((t) => t.id !== id)
  }

  createType(title: string) {
    const type = new TodoType(title)
    this.todoTypes.push(type)
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
