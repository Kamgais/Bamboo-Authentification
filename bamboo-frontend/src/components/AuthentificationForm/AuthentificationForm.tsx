import React, {FunctionComponent} from 'react'
import {Formik, Form} from 'formik'
import './style.scss'
import { FormControl } from '..'
import * as Yup from 'yup'
import {AiOutlineGithub} from 'react-icons/ai';
import {BsFacebook} from 'react-icons/bs'
import {FcGoogle} from 'react-icons/fc';
import { Link } from 'react-router-dom'


type Props = {
    type: string
}

const AuthentificationForm: FunctionComponent<Props> = ({type}) => {
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
        username: Yup.string().required('username is required').min(3).max(20),
        email: Yup.string().email('email must be in the right format').required('Email is required'),
        password: Yup.string().required('Password is required').min(8).max(20),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'),''], 'Passwords must match').required('Confirm password is required')
    })
  return (
    <div className="authentification_form_container">
        <div className="authentification_form_left_side">
            <img src='/fav.png' className='left_side_img'/>
        </div>
        <div className="authentification_form_right_side">
            <h2 className='authentification_form_title'>Bamboo {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
           <Formik initialValues={ type === 'login' ? loginInitialValues : createAccountInitialValues} validationSchema={type === 'login'? loginValidationSchema : createAccountValidationSchema} onSubmit={() => {}}>
             {
                ({isSubmitting, isValid, dirty}) => (
                    <Form>
                        <FormControl control='input' name='username' label='' withLabel={false} type='text' placeholder='Username'/>
                        {type === 'register' && (
                            <FormControl control='input' name='email' label='' withLabel={false} type='email' placeholder='Email'/>
                         )}
                        <FormControl control='input' name='password' label='' withLabel={false} type='password' placeholder='Password'/>
                         { type === 'login' && <p className="forgot_password_handler_text">Forgot your password?</p>}
                         {type === 'register' && (
                            <FormControl control='input' name='ConfirmPassword' label='' withLabel={false} type='password' placeholder='Re-Password'/>
                         )}
                        <button type='submit' disabled={isSubmitting || !isValid || !dirty} className='auth_submit_button'>{type.charAt(0).toUpperCase() + type.slice(1)}</button>
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
                <button className="other_options_list_item">
                    <FcGoogle/>
                </button>
            </div>
           </div>
        </div>

    </div>
  )
}

export default AuthentificationForm