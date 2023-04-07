import { Form, Formik } from 'formik'
import React, {FunctionComponent} from 'react'
import { FormControl, LoadingSpinner } from '../../components'
import * as Yup from 'yup';
import './forgotPassword.scss';
import { useSendResetLink } from '../../hooks';
import useStore from '../../store/AppStore';

const ForgotPasswordPage: FunctionComponent = () => {
    const {requestLoading} = useStore();
    const sendLink = useSendResetLink();
    const initialValues = {
        email: ''
    }
    const validationSchema = Yup.object({
        email: Yup.string().required('email is required').email('email must be in the right format')
    })

    const handleSubmit = async(values: Yup.InferType<typeof validationSchema>, action: any) => {
        try {
          await  sendLink.mutateAsync(values);  
          action.resetForm();
        } catch (error) {
            console.log(error);
        }
        
    }
  return (
    <div className="forgot_password_container">
        <h2 className='forgot_password_title'>😞 You forgot your password !!!</h2>
        <p className='forgot_password_explained'>Enter your email  to receive the link to reset your password</p>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values, action) => handleSubmit(values,action)}>
            {
                ({isSubmitting, isValid, dirty}) => (
                    <Form>
                        <FormControl name='email' label='' withLabel={false} placeholder='Reset-password email' control='input'/>
                        <button type='submit' className='forgot_password_submit_password' disabled={isSubmitting || !isValid || !dirty}>
                            {
                                requestLoading && (
                                    <LoadingSpinner/>
                                )
                            }
                            Receive reset password link
                            </button>
                    </Form>
                )
            }
        </Formik>
    </div>
  )
}

export default ForgotPasswordPage