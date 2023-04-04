import React, {FunctionComponent} from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

type Props = {
    label?: string,
    name: string,
    type?: string,
    placeholder?: string,
    withLabel?:boolean

}

const Input: FunctionComponent<Props> = ({label, name, type,placeholder, withLabel}) => {
  return (
    <div className='formik-control'>
        {withLabel && <label htmlFor={name}>{label}</label>} 
        <Field name={name} id={name} type={type} placeholder={placeholder} />
        <ErrorMessage name={name}>
            {
                (errorMsg:any) => <TextError>{errorMsg}</TextError>
            }
        </ErrorMessage>
    </div>
  
  )
}

export default Input