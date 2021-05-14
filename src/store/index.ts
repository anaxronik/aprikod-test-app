import { TodoStore } from './Todo'

export class Store {
  todoStore: TodoStore

  constructor() {
    this.todoStore = new TodoStore(this)
  }
}
