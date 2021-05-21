export class TodoType {
  id: string
  title: string = ''

  constructor(text: string) {
    this.id = Math.random().toString()
    this.title = text
  }
}
