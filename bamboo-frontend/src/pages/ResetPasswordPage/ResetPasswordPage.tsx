import React, {FunctionComponent} from 'react'
import './resetPassword.scss';
import { Form, Formik } from 'formik';
import { FormControl } from '../../components';
import * as Yup from 'yup';

const ResetPasswordPage: FunctionComponent = () => {
    const initialValues = {
        password: '',
        confirmEamil: ''
    }

    const validationSchema = Yup.object({
        password: Yup.string().required('Password is required').min(3).max(20),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), '' ], 'Passwords must match').required('confirm password field is required')
    })
  return (
    <div className="reset_password_container">
        <h2 className="reset_password_title">Reset Password</h2>
        <p className="reset_password_explained">Enter your new password </p>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={() => {}}>
            {
                () => (
                    <Form>
                        <FormControl name='password' label='' withLabel={false} placeholder='New Password' control='input' type='password'/>
                        <FormControl name='confirmPassword' label='' withLabel={false} placeholder='Confirm your new password' control='input' type='password'/>
                        <button type='submit'>Reset password</button>
                    </Form>
                )
            }
        </Formik>
    </div>
  )
}

export default ResetPasswordPage