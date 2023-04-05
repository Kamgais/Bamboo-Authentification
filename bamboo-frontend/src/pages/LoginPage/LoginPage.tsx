import React, {FunctionComponent} from 'react'
import './style.scss'
import { AuthentificationForm } from '../../components'

const LoginPage: FunctionComponent = () => {
  return (
   <AuthentificationForm type='login'/>
  )
}

export default LoginPage