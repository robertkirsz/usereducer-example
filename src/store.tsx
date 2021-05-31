import { createContext, useReducer, useContext } from 'react'
import type { Dispatch } from 'react'
import type { TodoInterface, SettingsInterface, StoreStateInterface } from 'types'

enum ActionTypes {
  addTodo = 'addTodo',
  deleteTodo = 'deleteTodo',
  toggleDarkMode = 'toggleDarkMode',
}

type Actions =
  | { type: ActionTypes.addTodo; payload: { text: TodoInterface['text'] } }
  | { type: ActionTypes.deleteTodo; payload: { id: TodoInterface['id'] } }
  | { type: ActionTypes.toggleDarkMode }

const createDispatch = (dispatch: Dispatch<Actions>) => ({
  [ActionTypes.addTodo]: (text: TodoInterface['text']) => {
    dispatch({ type: ActionTypes.addTodo, payload: { text } })
  },
  [ActionTypes.deleteTodo]: (id: TodoInterface['id']) => {
    dispatch({ type: ActionTypes.deleteTodo, payload: { id } })
  },
  [ActionTypes.toggleDarkMode]: () => {
    dispatch({ type: ActionTypes.toggleDarkMode })
  },
})

const todosReducer = (state: TodoInterface[], action: Actions) => {
  switch (action.type) {
    case ActionTypes.addTodo:
      return [...state, { id: Date.now(), text: action.payload.text }]
    case ActionTypes.deleteTodo:
      return state.filter(todo => todo.id !== action.payload.id)
    default:
      return state
  }
}

const settingsReducer = (state: SettingsInterface, action: Actions) => {
  switch (action.type) {
    case ActionTypes.toggleDarkMode:
      return { ...state, darkMode: !state.darkMode }
    default:
      return state
  }
}

const initialState = {
  todos: [],
  settings: {
    darkMode: false,
  },
}

const StoreContext = createContext<{
  todos: StoreStateInterface['todos']
  settings: StoreStateInterface['settings']
  dispatch: ReturnType<typeof createDispatch>
}>({
  todos: initialState.todos,
  settings: initialState.settings,
  dispatch: createDispatch(() => {}),
})

export const useStore = () => useContext(StoreContext)

export default function StoreProvider({ ...props }) {
  const [{ todos, settings }, dispatch] = useReducer(
    (state: StoreStateInterface, action: Actions) => ({
      todos: todosReducer(state.todos, action),
      settings: settingsReducer(state.settings, action),
    }),
    initialState
  )

  return (
    <StoreContext.Provider
      value={{ todos, settings, dispatch: createDispatch(dispatch) }}
      {...props}
    />
  )
}
