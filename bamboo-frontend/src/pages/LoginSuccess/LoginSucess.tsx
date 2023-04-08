import React,{FunctionComponent, useEffect} from 'react'
import './loginSuccess.scss';

const LoginSucess: FunctionComponent = () => {
    useEffect(() => {
        setTimeout(() => {
            window.close()
        },2000)
    },[])

  return (
    <div className="login_success_container">
        <h1 className="login_success_title">
            Thanks for Sign In
        </h1>
    </div>
  )
}

export default LoginSucess