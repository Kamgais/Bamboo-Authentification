import React, {FunctionComponent, PropsWithChildren} from 'react'
import { useUser } from '../../hooks'
import { Navigate } from 'react-router-dom';



type Props = {
    children: JSX.Element
}



const PrivateRoute: FunctionComponent<Props> = ({children}) => {
 const authUser = useUser();

 if(!authUser) {
    return <Navigate to='/login'/>
 }
  return (
    <>
    {children}
    </>
  )
}

export default PrivateRoute