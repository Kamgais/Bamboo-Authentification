import React, {FunctionComponent} from 'react'
import {Field, ErrorMessage} from 'formik';
import TextError from './TextError';

type Props = {
    label?: string,
    name: string,
    placeholder?: string,
    withLabel?:boolean
}

const TextArea: FunctionComponent<Props> = ({label, name,placeholder,withLabel}) => {
  return (
    <div className="formik-control">
      {withLabel && <label htmlFor={name}>{label}</label>}
      <Field as='textarea' name={name} id={name} placeholder={placeholder}/>
      <ErrorMessage name={name}>
         {
            (errorMsg:any) => <TextError>{errorMsg}</TextError>
         }
      </ErrorMessage>
    </div>
  )
}

export default TextArea