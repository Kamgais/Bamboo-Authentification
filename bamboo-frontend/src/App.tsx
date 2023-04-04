import { useState } from 'react'
import './App.scss'
import { AuthentificationForm } from './components'


function App() {

  return (
    <div className="App">
      <AuthentificationForm type='login'/>
    </div>
  )
}

export default App
