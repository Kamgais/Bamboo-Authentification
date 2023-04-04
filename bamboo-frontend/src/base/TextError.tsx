import React, {FunctionComponent} from 'react'
import {MdErrorOutline} from 'react-icons/md'

type Props = {
    children: string
}


const styles = {
    fontSize: '13px',
    color: '#c0392b',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontWeight: '300'
}

const TextError: FunctionComponent<Props> = ({children}) => {
  return (
    <div className='error' style={styles}>
     <MdErrorOutline/> {children}
    </div>
  )
}

export default TextError