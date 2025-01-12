// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Store } from './Redux/Store/Store.ts'
import { Provider } from 'react-redux'



createRoot(document.getElementById('root')!).render(
  <Provider store={Store}>
    <BrowserRouter>
   
      <App />
   
    </BrowserRouter>
  </Provider>
)
