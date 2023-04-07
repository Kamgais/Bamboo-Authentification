import { Form, Formik } from 'formik'
import React, {FunctionComponent} from 'react'
import { FormControl } from '../../components'
import * as Yup from 'yup';
import './forgotPassword.scss';

const ForgotPasswordPage: FunctionComponent = () => {
    const initialValues = {
        email: ''
    }
    const validationSchema = Yup.object({
        email: Yup.string().required('email is required').email('email must be in the right format')
    })
  return (
    <div className="forgot_password_container">
        <h2 className='forgot_password_title'>😞 You forgot your password !!!</h2>
        <p className='forgot_password_explained'>Enter your email  to receive the link to reset your password</p>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={() => {}}>
            {
                ({isSubmitting, isValid, dirty}) => (
                    <Form>
                        <FormControl name='email' label='' withLabel={false} placeholder='Reset-password email' control='input'/>
                        <button type='submit' className='forgot_password_submit_password' disabled={isSubmitting || !isValid || !dirty}>Receive reset password link</button>
                    </Form>
                )
            }
        </Formik>
    </div>
  )
}

export default ForgotPasswordPage