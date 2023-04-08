import React, {FunctionComponent} from 'react'
import './app.scss';
import { useLogout } from '../../hooks';

const App: FunctionComponent = () => {
    const logout = useLogout();

    const logoutHandler = async() => {
       try {
        await logout.mutateAsync()
       } catch (error) {
        
       }
    }
  return (
    <button className='app_button' onClick={logoutHandler}>LOGOUT</button>
  )
}

export default App