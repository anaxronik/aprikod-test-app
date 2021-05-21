import { TodoStore } from './Todo/TodoStore'

export class Store {
  todoStore: TodoStore

  constructor() {
    this.todoStore = new TodoStore(this)
  }
}
