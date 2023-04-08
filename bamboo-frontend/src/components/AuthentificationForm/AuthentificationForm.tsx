import React, {FunctionComponent, useState} from 'react'
import {Formik, Form} from 'formik'
import './style.scss'
import { FormControl, LoadingSpinner } from '..'
import * as Yup from 'yup'
import {AiOutlineGithub} from 'react-icons/ai';
import {BsFacebook} from 'react-icons/bs'
import {FcGoogle} from 'react-icons/fc';
import { Link } from 'react-router-dom'
import useStore from '../../store/AppStore'
import { useGoogleAuth, useLogin, useSignUp } from '../../hooks'
import { useNavigate } from 'react-router-dom'



type Props = {
    type: string
}

const AuthentificationForm: FunctionComponent<Props> = ({type}) => {
    const [enabled, setEnabled] = useState(false)
    const googleUser = useGoogleAuth(enabled);
    const {requestLoading} = useStore();
    const signUp = useSignUp();
    const login = useLogin();
    const navigate = useNavigate()
    const loginInitialValues = {
        username: '',
        password: ''
    }

    const createAccountInitialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const loginValidationSchema = Yup.object({
        username: Yup.string().required('username is required').min(3).max(20),
        password: Yup.string().required('password is required').min(8).max(20)
    })

    const createAccountValidationSchema = Yup.object({
        username: Yup.string().required('Username is required').min(3).max(20),
        email: Yup.string().email('email must be in the right format').required('Email is required'),
        password: Yup.string().required('Password is required').min(8).max(20),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'),''], 'Passwords must match').required('Confirm password is required')
    })


    // handle submit button 
    const handleSubmit = async (values: Yup.InferType<typeof loginValidationSchema> | Yup.InferType<typeof createAccountValidationSchema>, action:any ) => {
       if(type === 'register')  {
        try {
            await signUp.mutateAsync(values);
            action.resetForm({
                values: createAccountInitialValues
            })
            navigate('/login')   
        } catch (error) {
            console.log(error)
        }
      
       }
       else if(type === 'login') {
        try {
           await login.mutateAsync(values);
           action.resetForm({
            values: loginInitialValues
           })
          // navigate('/app')
        } catch (error) {
            console.log(error);
        }
       }

    }

    // navigate to google page auth
   const loginWithGoogle = () => {
    let timer = null;
    const googleLoginURL = 'http://localhost:3001/bamboo/api/v1/auth/google';
  const newWindow =  window.open( googleLoginURL, '_blank', "width=500,height=600");
  if(newWindow) {
    timer = setInterval(() => {
        if(newWindow.closed) {
       setEnabled(true);
        
        }
    },500)
  }
   }



    const navigateToResetPage = () => {
        navigate('/forgot-password')
    }
  return (
    <div className="authentification_form_container">
        <div className="authentification_form_left_side">
            <img src='/fav.png' className='left_side_img'/>
        </div>
        <div className="authentification_form_right_side">
            <h2 className='authentification_form_title'>Bamboo {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
           <Formik initialValues={ type === 'login' ? loginInitialValues : createAccountInitialValues} validationSchema={type === 'login'? loginValidationSchema : createAccountValidationSchema} onSubmit={(values, action) => handleSubmit(values, action)}>
             {
                ({isSubmitting, isValid, dirty}) => (
                    <Form>
                        <FormControl control='input' name='username' label='' withLabel={false} type='text' placeholder='Username'/>
                        {type === 'register' && (
                            <FormControl control='input' name='email' label='' withLabel={false} type='email' placeholder='Email'/>
                         )}
                        <FormControl control='input' name='password' label='' withLabel={false} type='password' placeholder='Password'/>
                         { type === 'login' && <p className="forgot_password_handler_text" onClick={navigateToResetPage}>Forgot your password?</p>}
                         {type === 'register' && (
                            <FormControl control='input' name='confirmPassword' label='' withLabel={false} type='password' placeholder='Re-Password'/>
                         )}
                        <button type='submit' disabled={isSubmitting || !isValid || !dirty} className='auth_submit_button'>
                            { requestLoading && <LoadingSpinner/>}
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        <p className="extra_handler_text">{type === 'login'? 'Not registred?': 'Already an account?'} <Link to={type === 'login'? '/register': '/login'}><span>{type === 'login'? 'Create an account' : 'Sign in' }</span></Link> </p>
                    </Form>
                )
             }
           </Formik>
           <div className="authentification_form_other_options">
            <p className="other_options_text">Other options : </p>
            <div className="other_options_list">
                <button className="other_options_list_item">
                    <AiOutlineGithub/>
                </button>
                <button className="other_options_list_item">
                    <BsFacebook/>
                </button>
                <button className="other_options_list_item" onClick={loginWithGoogle}>
                    <FcGoogle/>
                </button>
            </div>
           </div>
        </div>

    </div>
  )
}

export default AuthentificationForm