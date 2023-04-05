import React, {FunctionComponent} from 'react'
import './style.scss'
import { AuthentificationForm } from '../../components'

const RegisterPage: FunctionComponent = () => {
  return (
    <AuthentificationForm type='register'/>
  )
}

export default RegisterPage