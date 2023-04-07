import React, {FunctionComponent} from 'react'
import './resetPassword.scss';
import { Form, Formik } from 'formik';
import { FormControl, LoadingSpinner } from '../../components';
import * as Yup from 'yup';
import { useResetPassword } from '../../hooks';
import { useParams, useNavigate } from 'react-router-dom';
import useStore from '../../store/AppStore';

const ResetPasswordPage: FunctionComponent = () => {
    const resetPassword = useResetPassword();
    const {token} = useParams();
    const navigate = useNavigate();
    const {requestLoading} = useStore();
    const initialValues = {
        password: '',
        confirmPassword: ''
    }

    const validationSchema = Yup.object({
        password: Yup.string().required('password field is required').min(3).max(20),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), '' ], 'Passwords must match').required('confirm password field is required')
    })

    const handleSubmit = async(values: Yup.InferType<typeof validationSchema>, action:any) => {
       const {password} = values;
       try {
        await resetPassword.mutateAsync({body: {password}, token: token!})
        action.resetForm();
        navigate('/login')
       } catch (error) {
        console.log(error)
       }
    }
  return (
    <div className="reset_password_container">
        <h2 className="reset_password_title">😉Reset Password</h2>
        <p className="reset_password_explained">Enter your new password </p>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values, action) => handleSubmit(values,action)}>
            {
                ({isSubmitting, isValid, dirty}) => (
                    <Form>
                        <FormControl name='password' label='' withLabel={false} placeholder='New Password' control='input' type='password'/>
                        <FormControl name='confirmPassword' label='' withLabel={false} placeholder='Confirm your new password' control='input' type='password'/>
                        <button type='submit' className='reset_password_submit_password' disabled={isSubmitting || !isValid || !dirty} >
                            {
                                requestLoading && (
                                    <LoadingSpinner/>
                                )
                            }
                            Reset password
                            </button>
                    </Form>
                )
            }
        </Formik>
    </div>
  )
}

export default ResetPasswordPage