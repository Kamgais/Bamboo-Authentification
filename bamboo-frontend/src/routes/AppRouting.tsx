import React, {FunctionComponent} from 'react'
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
  } from "react-router-dom";

import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, LoginSuccessPage, PrivateRoute, AppContainer } from '../pages';

const AppRouting: FunctionComponent = () => {

    const router = createBrowserRouter([
        {
          path: "/",
          element: <Navigate to='/login'/>,
          errorElement: <NotFoundPage/>
        },
        {
            path: '/register',
            element: <RegisterPage/>
        },
        {
            path: '/login',
            element: <LoginPage/>
        },
        {
          path: '/forgot-password',
          element: <ForgotPasswordPage/>
        },
        {
          path: '/reset-password/:token',
          element: <ResetPasswordPage/>
        }
        ,
        {
          path: '/login/success',
          element: <LoginSuccessPage/>
        },
        {
          path: '/app',
          element: <PrivateRoute><AppContainer/></PrivateRoute>
        }

      ]);
  return (
    <RouterProvider router={router} />
  )
}

export default AppRouting