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
    options?: OptionItem[],
    withLabel?: boolean
}

const Radio: FunctionComponent<Props> = ({label, name, options, withLabel}) => {
  return (
    <div className="formik-control">
        {withLabel && <label htmlFor={name}>{name}</label>}
        <Field name={name} id={name}>
          {
            ({field}: any) => {
                return (
                    options?.map((option: any) => (
                        <React.Fragment key={option.value}>
                        <input
                        type='radio'
                        id={option.value}
                        {...field}
                        value={option.value}
                        checked={field.value === option.value}
                        />
                        <label htmlFor={option.value}>{option.key}</label>
                        </React.Fragment>
                    ))
                )
            }
          }
        </Field>
        <ErrorMessage name={name}>
        {
            (errorMsg: any) => <TextError>{errorMsg}</TextError>
        }
      </ErrorMessage>
    </div>
  )
}

export default Radio
