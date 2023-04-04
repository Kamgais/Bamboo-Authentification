import { ErrorMessage, Field } from 'formik'
import React, {FunctionComponent} from 'react'
import DateView from 'react-datepicker';
import TextError from './TextError';



type Props = {
    label: string,
    name: string
}

const DatePicker: FunctionComponent<Props> = ({label, name}) => {
  return (
    <div className="formik-control">
       <label htmlFor={name}>{label}</label>
       <Field name={name} id={name}>
        {
            ({form:{setFieldValue}, field}: any) => {
                return (
                    <DateView
                    id={name}
                    closeOnScroll = {(e:any) => e.target === document}
                    {...field}
                    selected={field.value}
                    onChange={(date:any) => setFieldValue(name, date)}
                    />
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

export default DatePicker