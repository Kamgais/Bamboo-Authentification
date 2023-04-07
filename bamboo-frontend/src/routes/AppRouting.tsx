import React, {FunctionComponent} from 'react'
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
  } from "react-router-dom";

import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import { LoginPage, RegisterPage, ForgotPasswordPage } from '../pages';

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
        }

      ]);
  return (
    <RouterProvider router={router} />
  )
}

export default AppRouting