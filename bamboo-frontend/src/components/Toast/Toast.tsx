import React, { FunctionComponent } from 'react'
import {AiFillInfoCircle, AiOutlineCheckCircle, AiOutlineCloseCircle} from 'react-icons/ai'
import {CgClose} from 'react-icons/cg'
import './toast.scss';
import { useToasts } from './ToastContext';

type Props = {
  
    title?: string,
    content:string,
    type?: "success" | "info" | "error" | "default"
}
const Toast: FunctionComponent<Props> = ({title, content, type}) => {
    const {removeToast} = useToasts();
  return (
    <div className={`toast toast-${type}`}>
       <div className="toast-border-left"></div>
       <div className="toast-icon">
        {
        type === 'info' && (<AiFillInfoCircle/>)
       }
       {
         type === 'success' && (<AiOutlineCheckCircle/>)
       }
       {
        type === 'error' && (<AiOutlineCloseCircle/>)
       }

       {
        type === 'default' && (<AiFillInfoCircle/>)
       }
       </div>
       <div className="toast-infos">
       {
        title && (
            <p className='toast-title'>
                <strong>{title}</strong>
            </p>
        )
      }
      <p className='toast-content'>{content}</p>
       </div>

       <div className="toast-close-button" onClick={() => removeToast(content)}>
            <CgClose/>
       </div>
      
    </div>
  )
}

export default Toast