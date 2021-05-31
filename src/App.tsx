import { useStore } from 'store'
import DarkModeSwitch from 'DarkModeSwitch'
import TODOs from 'TODOs'
import logo from 'logo.svg'

export default function App() {
  const { settings } = useStore()

  return (
    <main className={settings.darkMode ? 'dark' : ''}>
      <img src={logo} alt="Logo" />
      <DarkModeSwitch />
      <TODOs />
    </main>
  )
}
