import { useStore } from 'store'

export default function DarkModeSwicth() {
  const { dispatch } = useStore()

  return <button onClick={dispatch.toggleDarkMode}>Toggle dark mode</button>
}
