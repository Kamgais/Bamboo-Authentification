import React, {FunctionComponent} from 'react'
import { CheckBox, DatePicker, Input, Radio, Select, TextArea } from '../../base'




type OptionItem = {
    key: string,
    value: string
}

type Props = {
    control: string,
    label: string,
    name: string,
    placeholder?: string
    type?: string
    withLabel?:boolean
    options?: OptionItem[]
}

const FormikControl: FunctionComponent<Props> = (props) => {
 
    switch(props.control) {
        
        case 'input' : return <Input {...props}/>
        case 'textarea' : return <TextArea {...props}/>
        case 'select' : return <Select {...props}/>
        case 'radio' : return <Radio {...props}/>
        case 'checkbox': return <CheckBox {...props}/>
        case 'date': return <DatePicker {...props}/>
        default: return <Input {...props}/>
    }
}

export default FormikControl