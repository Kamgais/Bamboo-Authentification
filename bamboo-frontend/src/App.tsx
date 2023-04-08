import './App.scss'
import AppRequestSpinner from './components/AppRequestSpinner/AppRequestSpinner'
import { ToastContextProvider } from './components/Toast/ToastContext'
import AppRouting from './routes/AppRouting'
import useStore from './store/AppStore'





function App() {
  const {requestLoading} = useStore()
   return (
    <ToastContextProvider>
    <div className="App">
     {
       requestLoading && (
        <AppRequestSpinner/>
       )
     } 
      <AppRouting/>
    </div>
    </ToastContextProvider>
  
  )
}

export default App
