import React, {FunctionComponent} from 'react'
import {Field, ErrorMessage} from 'formik';
import TextError from './TextError';



type OptionItem = {
    key: string,
    value: string
}


type Props = {
    label: string,
    name: string,
    options?: OptionItem[]
    withLabel?: boolean

}

const Select: FunctionComponent<Props> = ({label, name, options, withLabel}) => {
  return (
    <div className='formik-control'>
     {withLabel && <label htmlFor={name}>{label}</label>}
     <Field as='select' name={name} id={name}>
        {
            options?.map((option) => (
                <option value={option.value} key={option.value}>{option.key}</option>
            ))
        }
     </Field>
     <ErrorMessage name={name}>
         {
            (errorMsg:any) => <TextError>{errorMsg}</TextError>
         }
     </ErrorMessage>
    </div>
  )
}

export default Select