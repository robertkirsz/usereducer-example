import { render } from 'react-dom'
import StoreProvider from 'store'
import App from 'App'
import 'index.css'

render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root')
)
