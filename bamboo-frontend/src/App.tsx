import './App.scss'
import { ToastContextProvider } from './components/Toast/ToastContext'
import AppRouting from './routes/AppRouting'





function App() {
   return (
    <ToastContextProvider>
    <div className="App">
      <AppRouting/>
    </div>
    </ToastContextProvider>
  
  )
}

export default App
