export interface TodoInterface {
  id: number
  text: string
}

export interface SettingsInterface {
  darkMode: boolean
}

export interface StoreStateInterface {
  todos: TodoInterface[]
  settings: SettingsInterface
}
