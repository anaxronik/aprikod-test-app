import { makeAutoObservable } from 'mobx'

import { TodoType } from './TodoType'

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
